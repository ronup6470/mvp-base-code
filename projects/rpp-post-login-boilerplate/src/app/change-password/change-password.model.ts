
/**
 * Password
 * @author Bhumi Desai.
 * @description
 */

export class Password {
       /**
        * Old password of password
        */
       public oldPassword: string;
       /**
        * New password of password
        */
       public newPassword: string;

       constructor(
              oldPassword?: string,
              newPassword?: string,
       ) {
              this.oldPassword = oldPassword;
              this.newPassword = newPassword;
       }
}







