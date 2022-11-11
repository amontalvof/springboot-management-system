package com.montalvo.managementsystem.repositories;

import java.util.List;

import com.montalvo.managementsystem.models.Usuario;

public interface UsuarioDao {
    List<Usuario> readUsuarios();

    void deleteUsuario(Long id);

    void createUsuario(Usuario usuario);

    Usuario obtenerUsuarioPorCredenciales(Usuario usuario);
}
