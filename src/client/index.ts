import { 
  Observable,
  Observer,
  interval,
  combineLatest,
  merge,
  fromEvent  
} from 'rxjs';
import {
  share,
  map,
  takeUntil,
  switchMap
} from "rxjs/operators"
import * as R from 'remeda'

const left$ = 
  interval(1000)
  .pipe(
    map(num => String.fromCharCode(65 + num)))

const basement$ = interval(2000)
  .pipe(
    map(num => Math.floor(Math.random() * 1000)),
    map(num => num.toString())
  )

const right$ = 
  interval(1000)

const theButton = document.querySelector("#thebutton")
const action$ = fromEvent(theButton,"click")

merge(merge(left$, right$),basement$)
    .pipe(
      map(item => item.toString()),
      takeUntil(action$)
    )
    .subscribe(log)

function log(msg: string) {
  let msgNode = document.createElement("li")
  msgNode.appendChild(document.createTextNode(msg))
  document.getElementsByClassName("output1")[0].appendChild(msgNode)
}