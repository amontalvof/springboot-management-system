package com.montalvo.managementsystem.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.montalvo.managementsystem.models.Usuario;
import com.montalvo.managementsystem.repositories.UsuarioDao;
import com.montalvo.managementsystem.utils.JWTUtil;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;

@RestController
public class UsuarioController {

    @Autowired
    private UsuarioDao usuarioDao;

    @Autowired
    private JWTUtil jwtUtil;

    @PostMapping("api/users")
    public void createUsuario(@RequestBody Usuario usuario) {
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1, 1024, 1, usuario.getPassword());
        usuario.setPassword(hash);
        usuarioDao.createUsuario(usuario);
    }

    @GetMapping("api/users")
    public List<Usuario> readUsuarios(@RequestHeader(value = "Authorization") String token) {
        if (!validarToken(token)) {
            return null;
        }
        return usuarioDao.readUsuarios();
    }

    @DeleteMapping("api/user/{id}")
    public void deleteUsuario(@RequestHeader(value = "Authorization") String token, @PathVariable Long id) {
        if (!validarToken(token)) {
            return;
        }
        usuarioDao.deleteUsuario(id);
    }

    private boolean validarToken(String token) {
        String usuarioId = jwtUtil.getKey(token);
        return usuarioId != null;
    }
}
