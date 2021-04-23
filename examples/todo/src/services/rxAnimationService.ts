import { Observable } from 'rxjs';

import { interval, animationFrameScheduler, defer, concat, of } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';


const frames$ = interval(0, animationFrameScheduler);

const ticks$ = defer(() => {
    const start = animationFrameScheduler.now();
    return frames$.pipe(
        map(() => animationFrameScheduler.now() - start),
    );
});

function valueOverTime(ms: number): Observable<number> {
    return ticks$.pipe(
        map(t => t / ms),
        takeWhile(t => t <= 1),
        x => concat(x, of(1)),
    );
}

export function tween(start: number, end: number, duration: number): Observable<number> {
    const difference = end - start;
    return valueOverTime(duration).pipe(
        map(d => Math.round(start + (d * difference)))
    );
}
