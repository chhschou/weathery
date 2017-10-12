import request from 'superagent'
import nock from 'nock'
import Rx from 'rxjs/Rx'

afterEach(() => {
  nock.cleanAll()
})

test('autocomplete works', (done) => {
  const base = 'https://autocomplete.wunderground.com'
  const interrupt = Rx.Observable.create((observer) => {
    let token = 0
    setInterval(() => {
      token++
      observer.next(token)
    }, 0)
  }).take(3)


  const doApi = (token) => {
    const op = Rx.Observable.create((observer) => {
      const frag = `/aq?query=${token}`
      nock(base)
        .get(frag)
        .delay(120)
        .reply(200, token)

      const req = request.get(base + frag)
        .end((err, res) => {
          if (err) observer.error(err)
          observer.next(res)
          observer.complete()
        })

      return () => {
        req.abort()
      }
    })

    return op
  }


  const searcher = interrupt.switchMap(doApi)
  searcher.subscribe(
    (res) => { expect(res.body).toBe(3) },
    (err) => console.log(err),
    () => done()
  )
})
