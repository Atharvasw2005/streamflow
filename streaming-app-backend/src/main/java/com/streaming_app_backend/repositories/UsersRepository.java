package com.streaming_app_backend.repositories;


import com.streaming_app_backend.entities.users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<users,Long> {

    Optional<users> findByUsername(String username);
}
