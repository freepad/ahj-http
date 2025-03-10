import { randomInt } from 'node:crypto'
import Koa from 'koa'
import { koaBody } from 'koa-body'
import json from 'koa-json'
import cors from '@koa/cors'

const config = {
  port: process.env.PORT ? Number(process.env.PORT) : 3030
}

class UserRepository {
  #users = new Map()

  has (id) {
    return this.#users.has(id)
  }

  get (id) {
    const hasUser = this.has(id)
    if (!hasUser) {
      throw new Error('user not found')
    }

    return this.#users.get(id)
  }

  update (id, user) {
    const hasUser = this.has(id)
    if (!hasUser) {
      throw new Error('user not found')
    }

    this.#users.set(id, {
      ...user,
      id
    })

    return this.get(id)
  }

  patch (id, user) {
    const hasUser = this.has(id)
    if (!hasUser) {
      throw new Error('user not found')
    }

    this.#users.set(id, {
      ...this.#users.get(id),
      ...user,
      id
    })

    return this.get(id)
  }

  create (user) {
    let id = randomInt(100, 10_000)
    while (this.#users.has(id)) {
      id = randomInt(100, 10_000)
    }
    user = {
      ...user,
      id
    }

    this.#users.set(id, user)

    return this.get(id)
  }

  remove (id) {
    this.#users.delete()
  }

  find () {
    return Array.from(this.#users.values())
  }
}

const app = new Koa();

const userRepository = new UserRepository()

const router = (ctx) => {
  const method = ctx.request.query.method

  switch (method) {
    case 'createUser': {
      const user = userRepository.create(ctx.request.body)
      ctx.body = user
      break;
    }
    case 'getUser': {
      const userId = Number(ctx.query.userId)
      const user = userRepository.get(userId)
      ctx.body = user
      break;
    }
    case 'getAllUser': {
      const users = userRepository.find()
      ctx.body = users
      break;
    }
    default:
      return ctx.throw(405);
  }
}

app.use(cors())
app.use(json())
app.use(koaBody())
// koa-router
app.use(async ctx => {
  if (ctx.request.path !== '/') {
    return ctx.throw(404);
  }

  router(ctx)
});

app.listen(config.port);
