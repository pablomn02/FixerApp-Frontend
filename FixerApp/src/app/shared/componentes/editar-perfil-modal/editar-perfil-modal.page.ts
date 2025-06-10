import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-editar-perfil-modal',
  templateUrl: './editar-perfil-modal.page.html',
  styleUrls: ['./editar-perfil-modal.page.scss'],
  standalone: false
})
export class EditarPerfilModalPage implements OnInit {
  @Input() idUsuario?: number;
  usuario: any = {};

  constructor(
    private modalCtrl: ModalController,
    private usuarioService: UsuarioService,
    public navCtrl: NavController
  ) {}

  ngOnInit() {
    const id = this.idUsuario ?? +localStorage.getItem('idUsuario')!;
    if (id) {
      this.usuarioService.getUsuarioById(id).subscribe(user => {
        this.usuario = user;
        this.usuario.contrasena = '';
      });
    }
  }

  cancelar() {
    this.modalCtrl.dismiss(false);
  }

  guardarCambios() {
    const body = {
      nombre: this.usuario.nombre,
      nombreUsuario: this.usuario.nombreUsuario,
      email: this.usuario.email,
      contrasena: this.usuario.contrasena
    };

    this.usuarioService.actualizarUsuario(this.usuario.id, body).subscribe(() => {
      this.modalCtrl.dismiss(true);
    });
  }
}
