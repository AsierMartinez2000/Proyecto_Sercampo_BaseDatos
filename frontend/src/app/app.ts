import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar.component/sidebar.component';
import { LoginComponent } from './components/login.component/login.component';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, SidebarComponent, LoginComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');

  constructor(
    private loginService: LoginService,
    private cdr: ChangeDetectorRef
  ) {}


  comprobarLogin(){

    return this.loginService.estadoLogin();

  }
}
