import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { FirebaseCodeErrorEnum } from '../utils/firebas-code-error';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth: Auth) { }

  codeError(code: string) {

//El correo ya existe
    switch(code) {
      case FirebaseCodeErrorEnum.EmailAlreadyInUse:
        return 'El usuario ya existe';

        //Contraseña debil
        case FirebaseCodeErrorEnum.WeakPassword:
        return 'La contraseña es muy debil';

        //Correo invalido
        case FirebaseCodeErrorEnum.InvalidEmail:
        return 'Correo invalido';

        //Contraseña es incorrecta
        case FirebaseCodeErrorEnum.WrongPassword:
          return 'Contraseña es incorrecta';

          //El usuario no existe
          case FirebaseCodeErrorEnum.UserNotFound:
          return 'El usuario no existe';
        default:
        return 'Error desconocido';
    }
  }


}
