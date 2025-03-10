import { UserService } from "./UserService";

const init = async () => {
  const user = await UserService.create({
    name: 'User' + Math.ceil(Math.random() * 1000),
    status: 'active'
  })

  await UserService.get(user.id)

  await UserService.getAll()
}

init()
