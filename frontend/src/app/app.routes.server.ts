import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },

  {
    path: 'cliente/:id_cliente',
    renderMode: RenderMode.Server  
  },

  {
    path: 'confirmado/:id_cliente',
    renderMode: RenderMode.Server  
  },

  {
    path: 'modificar/:id_cliente',
    renderMode: RenderMode.Server  
  }
];
