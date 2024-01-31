package com.ssafy.backend.domain.challenge.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.challenge.dto.ChallengeListResponseDto;
import com.ssafy.backend.domain.challenge.entity.QChallenge;
import com.ssafy.backend.domain.challenge.entity.QUserChallenge;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class ChallengeCustomRepositoryImpl implements ChallengeCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    QChallenge qChallenge = QChallenge.challenge;
    QUserChallenge qUserChallenge = QUserChallenge.userChallenge;

    // 참여중인 챌린지 목록
    @Override
    public List<ChallengeListResponseDto> findChallengeWithUserChallenge(Long userId) {

        return jpaQueryFactory.selectFrom(qChallenge)
                .innerJoin(qUserChallenge)
                .on(qChallenge.challengeId.eq(qUserChallenge.challenge.challengeId))
                .where(qUserChallenge.user.userId.eq(userId))
                .fetch().stream().map(ChallengeListResponseDto::toDto).collect(Collectors.toList());
    }
}
