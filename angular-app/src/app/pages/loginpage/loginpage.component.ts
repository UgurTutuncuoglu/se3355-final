import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../types';
import { UserService } from './user.servicec';
import { AuthService } from '../auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { switchMap, tap } from 'rxjs';
declare const google: any;


@Component({
  selector: 'loginpage',
  imports: [FormsModule,CommonModule],
  providers: [HttpClientModule,HttpClient],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.css'
})
export class LoginpageComponent {
loginEmail = '';
loginPassword = '';
userPhotoUrl: string = 'assets/default-user.png';
firstName = '';
lastName = '';
registerEmail = '';
registerPassword = '';
confirmPassword = '';
country = '';
city = '';
photoFile: File | null = null;

countries = ['Turkey', 'USA', 'Germany']; // example countries
cities: string[] = [];

passwordPattern = /^(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/;

constructor(private router: Router,
  private userService: UserService,
  private authService: AuthService
){
}
ngAfterViewInit(): void {
    const checkGoogle = () => {
      if ((window as any).google && google.accounts?.id) {
        this.loginWithGoogle();
      } else {
        setTimeout(checkGoogle, 100);
      }
    };

    checkGoogle();
  }
ngOnInit() {

}



onCountryChange(event: any) {
  const selectedCountry = event.target.value;
  // update cities list based on country (example)
  if (selectedCountry === 'Turkey') {
    this.cities = ['Istanbul', 'Ankara', 'Izmir'];
  } else if (selectedCountry === 'USA') {
    this.cities = ['New York', 'Los Angeles', 'Chicago'];
  } else if(selectedCountry === 'Germany'){
    this.cities = ['Berlin','Munich','Hamburg'];
  }
  else {
    this.cities = [];
  }
}

onFileSelected(event: any) {
  const file: File = event.target.files[0];
  
  if(file) {
    this.photoFile = file;
  }

  if(file.name.endsWith('.jpg') || file.name.endsWith('.png') || file.name.endsWith('.jpeg')){
    this.photoFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      this.userPhotoUrl = base64;

      // Store in localStorage or pass it to User object
      localStorage.setItem('photo', base64);
    };
    reader.readAsDataURL(file);  }
}


passwordsMatch(): boolean {
  return this.registerPassword === this.confirmPassword;
}

isPasswordValid(password: string): boolean {
  return this.passwordPattern.test(password);
}

login() {

  // const user = this.userService.login(this.loginEmail,this.loginPassword);
  

  // if(user){
  //   this.authService.setCurrentUser(user);
  //   alert('Giriş başarılı!');
  //   this.router.navigate(['/']);
  // } else {
  //   alert('Email veya şifre yanlış.');
  // }
   const credentials = {
    email: this.loginEmail,
    password: this.loginPassword
  };

  this.authService.login(credentials).subscribe({
    next: (response) => {
        console.log("Login response user:", response);

      // Save token and user data in local storage or a service
      response.user.photo = "assets/" + response.user.photo;
      this.authService.setCurrentUser(response.user);
      this.authService.setToken(response.token);
      
      alert('Giriş başarılı!');
      this.router.navigate(['/']);
    },
    error: (err) => {
      alert('Email veya şifre yanlış.');
    }
  });
  
  // TODO: implement login with email/password (with validations)
  // redirect to home page on success
  // this.router.navigate(['/']);
}

register() {
  

  if(!this.passwordsMatch()){
    alert('Passwords do not match');
    return;
  }

  if(!this.isPasswordValid(this.registerPassword)){
    alert('Şifre geçerli değil: En az 8 karakter, 1 sayı ve 1 özel karakter içermeli.');
    return;
  }

  if (this.userService.getUserByEmail(this.registerEmail)) {
    alert('Bu email zaten kullanılıyor');
    return;
  }
  
  const photo = localStorage.getItem('photo') || 'assets/default-user.png';


  const newUser: User = {
    id: Date.now(),
    name: this.firstName,
    surname: this.lastName,
    email: this.registerEmail,
    password: this.registerPassword,
    country: this.country,
    city: this.city,
    photo: photo
  };
  this.authService.setCurrentUser(newUser); // for local page
  
  
this.authService.register(newUser).pipe(
  tap({
    next: () => console.log('HTTP POST succeeded'),
    error: (err: any) => console.log('HTTP POST error', err),
    complete: () => console.log('HTTP POST complete')
  })
).subscribe({
  next: () => {
    alert('Kayıt başarılı!');
    this.userService.addUser(newUser);
    this.router.navigate(['/']);
  },
  error: (err) => {
    alert('Kayıt sırasında hata oluştu.');
    console.error('Error details:', err);
  }
});






  
}




// loginWithGoogle() {
//   google.accounts.id.initialize({
//     client_id: '554763997961-m847jq8gtvaheklst29695tl1mjpog5n.apps.googleusercontent.com',
//     callback: (response: any) => {
//       console.log("Google callback triggered:", response);
//       this.handleGoogleResponse(response);
//     }
//   });

//   // Delay to ensure DOM is ready
//   setTimeout(() => {
//     const btn = document.getElementById("googleBtn");
//     if (btn) {
//       google.accounts.id.renderButton(
//         btn,
//         { theme: "outline", size: "large" }
//       );
//     } else {
//       console.error("Google button container not found");
//     }
//   }, 200); // Delay long enough to let Angular render DOM

//   google.accounts.id.prompt(); // optional One Tap
// }
loginWithGoogle() {
  google.accounts.id.initialize({
    client_id: '554763997961-m847jq8gtvaheklst29695tl1mjpog5n.apps.googleusercontent.com',
    callback: (response: any) => this.handleGoogleCredentialResponse(response),
  });

  google.accounts.id.renderButton(
    document.getElementById('googleBtn'),
    { theme: 'outline', size: 'large' }
  );
}


  // handleGoogleResponse(response: any){
  //  const token = response.credential;
  //  //send this token to your backend verification (optional)
  //  console.log("works1....");

  //  const userInfo = this.parseJwt(token);
  //  console.log('Google User Info:',userInfo); 
  //    this.router.navigate(['/']);

  // }
handleGoogleCredentialResponse(response: any) {
  const token = response.credential;

  const decoded = this.parseJwt(token);
  console.log("Photo:",decoded);
  const user: User = {
    id: decoded.sub,
    name: decoded.given_name,
    email: decoded.email,
    photo: decoded.picture,
    surname: decoded.family_name,
    password: '',
    country: decoded.country,
    city: decoded.city
  };

  this.authService.setCurrentUser(user);
  alert('Google ile giriş başarılı!');
  this.authService.register(user);
  this.router.navigate(['/']);
}

  parseJwt(token: string): any {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  console.log("works2....");
  return JSON.parse(jsonPayload);
 }
}
