import { interval, of, throwError } from 'rxjs';
import { mergeMap, retry } from 'rxjs/operators';

// https://www.learnrxjs.io/learn-rxjs/operators/error_handling/retry

//emit value every 1s
const srcInterval = interval(1000);
const example = srcInterval.pipe(
  mergeMap((val) => {
    //throw error after 3 iteration
    if (val > 3) {
      return throwError('Error!');
    }
    return of(val);
  }),
  //retry 2 times on error
  retry(2)
);

const subscribe = example.subscribe({
  next: (val) => console.log(val),
  error: (val) => console.log(`${val}: Retried 2 times then quit!`),
});
