package com.montalvo.managementsystem.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.montalvo.managementsystem.models.Usuario;
import com.montalvo.managementsystem.repositories.UsuarioDao;
import com.montalvo.managementsystem.utils.JWTUtil;

@RestController
public class AuthController {

    @Autowired
    private UsuarioDao usuarioDao;

    @Autowired
    private JWTUtil jwtUtil;

    @PostMapping("api/login")
    public String login(@RequestBody Usuario usuario) {
        Usuario usuarioLogueado = usuarioDao.obtenerUsuarioPorCredenciales(usuario);
        if (usuarioLogueado != null) {
            String tokenJwt = jwtUtil.create(String.valueOf(usuarioLogueado.getId()), usuarioLogueado.getEmail());
            return tokenJwt;
        }
        return "FAIL";
    }
}
