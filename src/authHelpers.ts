import { Auth } from 'aws-amplify';

export default {

  /**
  * @summary get whether or not the user is authenticated
  **/
  async isAuthenticated(): Promise<boolean> {
    try {
      // If user is not auth'd, this will throw an exception
      await Auth.currentAuthenticatedUser();
      return true;
    } catch {
      return false;
    }
  },

  /**
  * @summary get the current user's name
  **/
  async getUserName(): Promise<string> {
    try {
      const user = await Auth.currentAuthenticatedUser();
      return user.attributes.given_name;
    } catch {
      return '';
    }
  },
};
