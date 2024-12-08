package com.teamunexpected.hrportal.service;

import com.teamunexpected.hrportal.model.User;

public interface UserService {
    User validateUser(String email, String password);
}
