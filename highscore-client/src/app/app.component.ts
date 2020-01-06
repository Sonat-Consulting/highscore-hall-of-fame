import { Component, OnInit } from '@angular/core';
import { ScoresService, Score, Fault } from 'src/lib/highscore-service';
import { first } from 'rxjs/internal/operators/first';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar, MatTableDataSource } from '@angular/material';

class Highscore implements Score {
  id: string;
  player: string;
  points: number;
  emoji: string;
  position: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  scores: Score[];
  form: FormGroup;
  displayedColumns: string[] = ['position', 'teamname', 'points', 'emoji'];
  dataSource: MatTableDataSource<any>;
  teamname: string;

  constructor(private scoreService: ScoresService, private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      team: null,
      points: null
    });
  }

  ngOnInit() {
    const observer = {
      next: res => this.handleScoreResponse(res),
      error: (err: Fault) => this.handleError(err)
    };

    this.scoreService
      .findScores()
      .pipe(first())
      .subscribe(observer);
  }
  handleScoreResponse(res) {
    const arr = new Array<Highscore>();
    res.forEach(score => {
      const obj: Highscore = {
        player: score.player,
        points: score.points,
        emoji: '',
        position: 0,
        id: score._id
      };
      arr.push(obj);
    });
    this.sortAndFindPosition(arr);

    this.scores = arr;
    this.dataSource = new MatTableDataSource(arr);
  }

  sortScore() {
    return (a, b) => {
      if (a.points > b.points) {
        return -1;
      }
      if (b.points > a.points) {
        return 1;
      }
      return 0;
    };
  }

  sortAndFindPosition(arr) {
    let i = 1;

    arr.sort(this.sortScore());
    arr.forEach(value => {
      value.position = i++;
    });
  }

  handleError(err: Fault) {
    alert(err.code + ':' + err.error + '. ' + err.message);
  }

  addNewTeam() {
    const observer = {
      next: res => this.handleAddNewScoreResponse(res),
      error: (err: Error) => this.handleError(err)
    };

    const obj: Score = {
      player: this.form.get('team').value,
      points: this.form.get('points').value
    };

    this.scoreService.createScore(obj).subscribe(observer);
  }

  handleAddNewScoreResponse(res) {
    const obj: Highscore = {
      player: res.player,
      points: res.points,
      emoji: '',
      position: 0,
      id: res._id
    };
    this.scores.push(obj);
    this.scores.sort(this.sortScore());
    this.sortAndFindPosition(this.scores);
    this.snackBar.open('New team added. ', 'Ok.', {
      duration: 3000
    });
    this.dataSource = new MatTableDataSource(this.scores);
  }

  removeScore() {
    const item = this.scores.find(score => score.player === this.teamname);
    if (item == null || item === undefined) {
      this.snackBar.open('Invalid team name. ', 'Ok.', {
        duration: 3000
      });
      return;
    }
    const observer = {
      next: res => this.handleRemoveScoreResponse(res, item),
      error: (err: Error) => this.handleError(err)
    };

    this.scoreService.removeScore(item.id).subscribe(observer);
  }

  handleRemoveScoreResponse(res, itemToRemove: Score) {
    this.scores = this.scores.filter(score => {
      return score.id !== itemToRemove.id;
    });
    this.sortAndFindPosition(this.scores);
    this.snackBar.open('Removed team. ', 'Ok.', {
      duration: 3000
    });
    this.dataSource = new MatTableDataSource(this.scores);
  }

  getEmojiForElement(element: Highscore) {
    if (element.position === 1) {
      return '🤩';
    }

    if (element.position === 2) {
      return '😄';
    }

    if (element.position === 3) {
      return '😅';
    }

    if (element.position > 2) {
      return '😃';
    }
  }
}
