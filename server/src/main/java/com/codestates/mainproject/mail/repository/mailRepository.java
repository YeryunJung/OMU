package com.codestates.mainproject.mail.repository;

import com.codestates.mainproject.mail.entity.Mail;
import com.codestates.mainproject.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface mailRepository extends JpaRepository <Mail,Long> {

    List<Mail> findAllByReaciver(Member member);
}
