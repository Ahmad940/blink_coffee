import { apiResponse } from '../api.helpers'
import { supabaseClient } from '../superbase_client.util'

export class UserService {
  private LOG_NAME = [UserService]

  async getUser(pubKey: string) {
    try {
      let getUser = await supabaseClient.from('user').select('*')

      const is = true

      if (is) return getUser.data

      let { data: user, error } = await supabaseClient
        .from('user')
        .insert({ pub_key: pubKey })

      if (error) return apiResponse(true, 'user details', error.message)

      return apiResponse(true, 'user details', user)
    } catch (error: any) {
      console.log(`${this.LOG_NAME} : `, error?.message)
      return apiResponse(false, 'failed fetching user', error?.message)
    }
  }
}
