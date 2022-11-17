package com.codestates.mainproject.mood.dto;

import com.codestates.mainproject.member.entity.Member;
import com.codestates.mainproject.palette.entity.MoodPaletteDetails;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MoodResponseDto {

    private Long moodId;
    private String body;
    private Member member;
    private MoodPaletteDetails moodPaletteDetails;
}
