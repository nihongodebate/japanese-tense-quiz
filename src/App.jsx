import React, { useState, useEffect } from 'react';
import { RefreshCw, ArrowRight, ArrowLeft, Check, X, BookText, Sparkles, Palette, PersonStanding, Clock, HelpCircle, Home } from 'lucide-react';

// --- 背景コンポーネント ---
const GeometricBackground = () => (
  <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, backgroundColor: '#f8fafc' }}>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="asanoha" patternUnits="userSpaceOnUse" width="70" height="40.4" patternTransform="scale(1)">
          <path d="M17.5 0l17.5 10.1v20.2L17.5 40.4 0 30.3V10.1z" strokeWidth="1" stroke="rgba(0, 82, 155, 0.1)" fill="none"></path>
          <path d="M0 10.1h35v20.2H0z" strokeWidth="1" stroke="rgba(0, 82, 155, 0.1)" fill="none"></path>
          <path d="M17.5 0v40.4M0 20.2h70" strokeWidth="1" stroke="rgba(0, 82, 155, 0.05)" fill="none"></path>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#asanoha)" />
    </svg>
  </div>
);

// --- データセット ---
const quizData = {
  noun: [
    { word: '学生', reading: 'がくせい', korean: '학생', conjugations: { present: '学生です', negative: '学生じゃありません', negative_alt: '学生じゃないです', past: '学生でした', pastNegative: '学生じゃありませんでした', pastNegative_alt: '学生じゃなかったです' } },
    { word: '先生', reading: 'せんせい', korean: '선생님', conjugations: { present: '先生です', negative: '先生じゃありません', negative_alt: '先生じゃないです', past: '先生でした', pastNegative: '先生じゃありませんでした', pastNegative_alt: '先生じゃなかったです' } },
    { word: '医者', reading: 'いしゃ', korean: '의사', conjugations: { present: '医者です', negative: '医者じゃありません', negative_alt: '医者じゃないです', past: '医者でした', pastNegative: '医者じゃありませんでした', pastNegative_alt: '医者じゃなかったです' } },
    { word: '会社員', reading: 'かいしゃいん', korean: '회사원', conjugations: { present: '会社員です', negative: '会社員じゃありません', negative_alt: '会社員じゃないです', past: '会社員でした', pastNegative: '会社員じゃありませんでした', pastNegative_alt: '会社員じゃなかったです' } },
    { word: '日本人', reading: 'にほんじん', korean: '일본인', conjugations: { present: '日本人です', negative: '日本人じゃありません', negative_alt: '日本人じゃないです', past: '日本人でした', pastNegative: '日本人じゃありませんでした', pastNegative_alt: '日本人じゃなかったです' } },
    { word: '友達', reading: 'ともだち', korean: '친구', conjugations: { present: '友達です', negative: '友達じゃありません', negative_alt: '友達じゃないです', past: '友達でした', pastNegative: '友達じゃありませんでした', pastNegative_alt: '友達じゃなかったです' } },
    { word: '家族', reading: 'かぞく', korean: '가족', conjugations: { present: '家族です', negative: '家族じゃありません', negative_alt: '家族じゃないです', past: '家族でした', pastNegative: '家族じゃありませんでした', pastNegative_alt: '家族じゃなかったです' } },
    { word: '犬', reading: 'いぬ', korean: '개', conjugations: { present: '犬です', negative: '犬じゃありません', negative_alt: '犬じゃないです', past: '犬でした', pastNegative: '犬じゃありませんでした', pastNegative_alt: '犬じゃなかったです' } },
    { word: '猫', reading: 'ねこ', korean: '고양이', conjugations: { present: '猫です', negative: '猫じゃありません', negative_alt: '猫じゃないです', past: '猫でした', pastNegative: '猫じゃありませんでした', pastNegative_alt: '猫じゃなかったです' } },
    { word: '休日', reading: 'きゅうじつ', korean: '휴일', conjugations: { present: '休日です', negative: '休日じゃありません', negative_alt: '休日じゃないです', past: '休日でした', pastNegative: '休日じゃありませんでした', pastNegative_alt: '休日じゃなかったです' } },
    { word: '雨', reading: 'あめ', korean: '비', conjugations: { present: '雨です', negative: '雨じゃありません', negative_alt: '雨じゃないです', past: '雨でした', pastNegative: '雨じゃありませんでした', pastNegative_alt: '雨じゃなかったです' } },
    { word: '晴れ', reading: 'はれ', korean: '맑음', conjugations: { present: '晴れです', negative: '晴れじゃありません', negative_alt: '晴れじゃないです', past: '晴れでした', pastNegative: '晴れじゃありませんでした', pastNegative_alt: '晴れじゃなかったです' } },
    { word: '今日', reading: 'きょう', korean: '오늘', conjugations: { present: '今日です', negative: '今日じゃありません', negative_alt: '今日じゃないです', past: '今日でした', pastNegative: '今日じゃありませんでした', pastNegative_alt: '今日じゃなかったです' } },
    { word: '時間', reading: 'じかん', korean: '시간', conjugations: { present: '時間です', negative: '時間じゃありません', negative_alt: '時間じゃないです', past: '時間でした', pastNegative: '時間じゃありませんでした', pastNegative_alt: '時間じゃなかったです' } },
    { word: '場所', reading: 'ばしょ', korean: '장소', conjugations: { present: '場所です', negative: '場所じゃありません', negative_alt: '場所じゃないです', past: '場所でした', pastNegative: '場所じゃありませんでした', pastNegative_alt: '場所じゃなかったです' } },
    { word: '仕事', reading: 'しごと', korean: '일', conjugations: { present: '仕事です', negative: '仕事じゃありません', negative_alt: '仕事じゃないです', past: '仕事でした', pastNegative: '仕事じゃありませんでした', pastNegative_alt: '仕事じゃなかったです' } },
    { word: '趣味', reading: 'しゅみ', korean: '취미', conjugations: { present: '趣味です', negative: '趣味じゃありません', negative_alt: '趣味じゃないです', past: '趣味でした', pastNegative: '趣味じゃありませんでした', pastNegative_alt: '趣味じゃなかったです' } },
    { word: 'スポーツ', reading: 'スポーツ', korean: '스포츠', conjugations: { present: 'スポーツです', negative: 'スポーツじゃありません', negative_alt: 'スポーツじゃないです', past: 'スポーツでした', pastNegative: 'スポーツじゃありませんでした', pastNegative_alt: 'スポーツじゃなかったです' } },
    { word: '音楽', reading: 'おんがく', korean: '음악', conjugations: { present: '音楽です', negative: '音楽じゃありません', negative_alt: '音楽じゃないです', past: '音楽でした', pastNegative: '音楽じゃありませんでした', pastNegative_alt: '音楽じゃなかったです' } },
    { word: '映画', reading: 'えいが', korean: '영화', conjugations: { present: '映画です', negative: '映画じゃありません', negative_alt: '映画じゃないです', past: '映画でした', pastNegative: '映画じゃありませんでした', pastNegative_alt: '映画じゃなかったです' } },
  ],
  i_adjective: [
    { word: '大きい', reading: 'おおきい', korean: '크다', conjugations: { present: '大きいです', negative: '大きくありません', negative_alt: '大きくないです', past: '大きかったです', pastNegative: '大きくありませんでした', pastNegative_alt: '大きくなかったです' } },
    { word: '小さい', reading: 'ちいさい', korean: '작다', conjugations: { present: '小さいです', negative: '小さくありません', negative_alt: '小さくないです', past: '小さいかったです', pastNegative: '小さくありませんでした', pastNegative_alt: '小さくなかったです' } },
    { word: '新しい', reading: 'あたらしい', korean: '새롭다', conjugations: { present: '新しいです', negative: '新しくありません', negative_alt: '新しくないです', past: '新しかったです', pastNegative: '新しくありませんでした', pastNegative_alt: '新しくなかったです' } },
    { word: '古い', reading: 'ふるい', korean: '낡다', conjugations: { present: '古いです', negative: '古くありません', negative_alt: '古くないです', past: '古かったです', pastNegative: '古くありませんでした', pastNegative_alt: '古くなかったです' } },
    { word: '良い', reading: 'いい', korean: '좋다', conjugations: { present: 'いいです', negative: 'よくありません', negative_alt: 'よくないです', past: 'よかったです', pastNegative: 'よくありませんでした', pastNegative_alt: 'よくなかったです' } },
    { word: '悪い', reading: 'わるい', korean: '나쁘다', conjugations: { present: '悪いです', negative: '悪くありません', negative_alt: '悪くないです', past: '悪かったです', pastNegative: '悪くありませんでした', pastNegative_alt: '悪くなかったです' } },
    { word: '暑い', reading: 'あつい', korean: '덥다', conjugations: { present: '暑いです', negative: '暑くありません', negative_alt: '暑くないです', past: '暑かったです', pastNegative: '暑くありませんでした', pastNegative_alt: '暑くなかったです' } },
    { word: '寒い', reading: 'さむい', korean: '춥다', conjugations: { present: '寒いです', negative: '寒くありません', negative_alt: '寒くないです', past: '寒かったです', pastNegative: '寒くありませんでした', pastNegative_alt: '寒くなかったです' } },
    { word: '難しい', reading: 'むずかしい', korean: '어렵다', conjugations: { present: '難しいです', negative: '難しくありません', negative_alt: '難しくないです', past: '難しかったです', pastNegative: '難しくありませんでした', pastNegative_alt: '難しくなかったです' } },
    { word: '易しい', reading: 'やさしい', korean: '쉽다', conjugations: { present: '易しいです', negative: '易しくありません', negative_alt: '易しくないです', past: '易しかったです', pastNegative: '易しくありませんでした', pastNegative_alt: '易しくなかったです' } },
    { word: '面白い', reading: 'おもしろい', korean: '재미있다', conjugations: { present: '面白いです', negative: '面白くありません', negative_alt: '面白くないです', past: '面白かったです', pastNegative: '面白くありませんでした', pastNegative_alt: '面白くなかったです' } },
    { word: '美味しい', reading: 'おいしい', korean: '맛있다', conjugations: { present: '美味しいです', negative: '美味しくありません', negative_alt: '美味しくないです', past: '美味しかったです', pastNegative: '美味しくありませんでした', pastNegative_alt: '美味しくなかったです' } },
    { word: '忙しい', reading: 'いそがしい', korean: '바쁘다', conjugations: { present: '忙しいです', negative: '忙しくありません', negative_alt: '忙しくないです', past: '忙しかったです', pastNegative: '忙しくありませんでした', pastNegative_alt: '忙しくなかったです' } },
    { word: '楽しい', reading: 'たのしい', korean: '즐겁다', conjugations: { present: '楽しいです', negative: '楽しくありません', negative_alt: '楽しくないです', past: '楽しかったです', pastNegative: '楽しくありませんでした', pastNegative_alt: '楽しくなかったです' } },
    { word: '高い', reading: 'たかい', korean: '비싸다/높다', conjugations: { present: '高いです', negative: '高くありません', negative_alt: '高くないです', past: '高かったです', pastNegative: '高くありませんでした', pastNegative_alt: '高くなかったです' } },
    { word: '安い', reading: 'やすい', korean: '싸다', conjugations: { present: '安いです', negative: '安くありません', negative_alt: '安くないです', past: '安かったです', pastNegative: '安くありませんでした', pastNegative_alt: '安くなかったです' } },
    { word: '近い', reading: 'ちかい', korean: '가깝다', conjugations: { present: '近いです', negative: '近くありません', negative_alt: '近くないです', past: '近かったです', pastNegative: '近くありませんでした', pastNegative_alt: '近くなかったです' } },
    { word: '遠い', reading: 'とおい', korean: '멀다', conjugations: { present: '遠いです', negative: '遠くありません', negative_alt: '遠くないです', past: '遠かったです', pastNegative: '遠くありませんでした', pastNegative_alt: '遠くなかったです' } },
    { word: '速い', reading: 'はやい', korean: '빠르다', conjugations: { present: '速いです', negative: '速くありません', negative_alt: '速くないです', past: '速かったです', pastNegative: '速くありませんでした', pastNegative_alt: '速くなかったです' } },
    { word: '遅い', reading: 'おそい', korean: '느리다', conjugations: { present: '遅いです', negative: '遅くありません', negative_alt: '遅くないです', past: '遅かったです', pastNegative: '遅くありませんでした', pastNegative_alt: '遅くなかったです' } },
  ],
  na_adjective: [
    { word: 'きれい', reading: 'きれい', korean: '예쁘다/깨끗하다', conjugations: { present: 'きれいです', negative: 'きれいじゃありません', negative_alt: 'きれいじゃないです', past: 'きれいでした', pastNegative: 'きれいじゃありませんでした', pastNegative_alt: 'きれいじゃなかったです' } },
    { word: '静か', reading: 'しずか', korean: '조용하다', conjugations: { present: '静かです', negative: '静かじゃありません', negative_alt: '静かじゃないです', past: '静かでした', pastNegative: '静かじゃありませんでした', pastNegative_alt: '静かじゃなかったです' } },
    { word: '有名', reading: 'ゆうめい', korean: '유명하다', conjugations: { present: '有名です', negative: '有名じゃありません', negative_alt: '有名じゃないです', past: '有名でした', pastNegative: '有名じゃありませんでした', pastNegative_alt: '有名じゃなかったです' } },
    { word: '親切', reading: 'しんせつ', korean: '친절하다', conjugations: { present: '親切です', negative: '親切じゃありません', negative_alt: '親切じゃないです', past: '親切でした', pastNegative: '親切じゃありませんでした', pastNegative_alt: '親切じゃなかったです' } },
    { word: '元気', reading: 'げんき', korean: '건강하다/활기차다', conjugations: { present: '元気です', negative: '元気じゃありません', negative_alt: '元気じゃないです', past: '元気でした', pastNegative: '元気じゃありませんでした', pastNegative_alt: '元気じゃなかったです' } },
    { word: '好き', reading: 'すき', korean: '좋아하다', conjugations: { present: '好きです', negative: '好きじゃありません', negative_alt: '好きじゃないです', past: '好きでした', pastNegative: '好きじゃありませんでした', pastNegative_alt: '好きじゃなかったです' } },
    { word: '嫌い', reading: 'きらい', korean: '싫어하다', conjugations: { present: '嫌いです', negative: '嫌いじゃありません', negative_alt: '嫌いじゃないです', past: '嫌いでした', pastNegative: '嫌いじゃありませんでした', pastNegative_alt: '嫌いじゃなかったです' } },
    { word: '上手', reading: 'じょうず', korean: '잘하다', conjugations: { present: '上手です', negative: '上手じゃありません', negative_alt: '上手じゃないです', past: '上手でした', pastNegative: '上手じゃありませんでした', pastNegative_alt: '上手じゃなかったです' } },
    { word: '下手', reading: 'へた', korean: '못하다', conjugations: { present: '下手です', negative: '下手じゃありません', negative_alt: '下手じゃないです', past: '下手でした', pastNegative: '下手じゃありませんでした', pastNegative_alt: '下手じゃなかったです' } },
    { word: 'にぎやか', reading: 'にぎやか', korean: '번화하다', conjugations: { present: 'にぎやかです', negative: 'にぎやかじゃありません', negative_alt: 'にぎやかじゃないです', past: 'にぎやかでした', pastNegative: 'にぎやかじゃありませんでした', pastNegative_alt: 'にぎやかじゃなかったです' } },
    { word: '暇', reading: 'ひま', korean: '한가하다', conjugations: { present: '暇です', negative: '暇じゃありません', negative_alt: '暇じゃないです', past: '暇でした', pastNegative: '暇じゃありませんでした', pastNegative_alt: '暇じゃなかったです' } },
    { word: '大変', reading: 'たいへん', korean: '힘들다', conjugations: { present: '大変です', negative: '大変じゃありません', negative_alt: '大変じゃないです', past: '大変でした', pastNegative: '大変じゃありませんでした', pastNegative_alt: '大変じゃなかったです' } },
    { word: '便利', reading: 'べんり', korean: '편리하다', conjugations: { present: '便利です', negative: '便利じゃありません', negative_alt: '便利じゃないです', past: '便利でした', pastNegative: '便利じゃありませんでした', pastNegative_alt: '便利じゃなかったです' } },
    { word: '不便', reading: 'ふべん', korean: '불편하다', conjugations: { present: '不便です', negative: '不便じゃありません', negative_alt: '불편じゃないです', past: '불편でした', pastNegative: '불편じゃありませんでした', pastNegative_alt: '불편じゃなかったです' } },
    { word: '安全', reading: 'あんぜん', korean: '안전하다', conjugations: { present: '安全です', negative: '安全じゃありません', negative_alt: '安全じゃないです', past: '安全でした', pastNegative: '安全じゃありませんでした', pastNegative_alt: '安全じゃなかったです' } },
    { word: '危険', reading: 'きけん', korean: '위험하다', conjugations: { present: '危険です', negative: '危険じゃありません', negative_alt: '危険じゃないです', past: '危険でした', pastNegative: '危険じゃありませんでした', pastNegative_alt: '危険じゃなかったです' } },
    { word: '簡単', reading: 'かんたん', korean: '간단하다', conjugations: { present: '簡単です', negative: '簡単じゃありません', negative_alt: '簡単じゃないです', past: '簡単でした', pastNegative: '簡単じゃありませんでした', pastNegative_alt: '簡単じゃなかったです' } },
    { word: '複雑', reading: 'ふくざつ', korean: '복잡하다', conjugations: { present: '複雑です', negative: '複雑じゃありません', negative_alt: '複雑じゃないです', past: '複雑でした', pastNegative: '複雑じゃありませんでした', pastNegative_alt: '複雑じゃなかったです' } },
    { word: '大事', reading: 'だいじ', korean: '소중하다', conjugations: { present: '大事です', negative: '大事じゃありません', negative_alt: '大事じゃないです', past: '大事でした', pastNegative: '大事じゃありませんでした', pastNegative_alt: '大事じゃなかったです' } },
    { word: '大丈夫', reading: 'だいじょうぶ', korean: '괜찮다', conjugations: { present: '大丈夫です', negative: '大丈夫じゃありません', negative_alt: '大丈夫じゃないです', past: '大丈夫でした', pastNegative: '大丈夫じゃありませんでした', pastNegative_alt: '大丈夫じゃなかったです' } },
  ],
  verb: [
    { word: '会う', reading: 'あう', korean: '만나다', conjugations: { present: '会います', negative: '会いません', past: '会いました', pastNegative: '会いませんでした' } },
    { word: '行く', reading: 'いく', korean: '가다', conjugations: { present: '行きます', negative: '行きません', past: '行きました', pastNegative: '行きませんでした' } },
    { word: '話す', reading: 'はなす', korean: '이야기하다', conjugations: { present: '話します', negative: '話しません', past: '話しました', pastNegative: '話しませんでした' } },
    { word: '飲む', reading: 'のむ', korean: '마시다', conjugations: { present: '飲みます', negative: '飲みません', past: '飲みました', pastNegative: '飲みませんでした' } },
    { word: '帰る', reading: 'かえる', korean: '돌아가다/오다', conjugations: { present: '帰ります', negative: '帰りません', past: '帰りました', pastNegative: '帰りませんでした' } },
    { word: '書く', reading: 'かく', korean: '쓰다', conjugations: { present: '書きます', negative: '書きません', past: '書きました', pastNegative: '書きませんでした' } },
    { word: '聞く', reading: 'きく', korean: '듣다', conjugations: { present: '聞きます', negative: '聞きません', past: '聞きました', pastNegative: '聞きませんでした' } },
    { word: '泳ぐ', reading: 'およぐ', korean: '수영하다', conjugations: { present: '泳ぎます', negative: '泳ぎません', past: '泳ぎました', pastNegative: '泳ぎませんでした' } },
    { word: '遊ぶ', reading: 'あそぶ', korean: '놀다', conjugations: { present: '遊びます', negative: '遊びません', past: '遊びました', pastNegative: '遊びませんでした' } },
    { word: '買う', reading: 'かう', korean: '사다', conjugations: { present: '買います', negative: '買いません', past: '買いました', pastNegative: '買いませんでした' } },
    { word: '食べる', reading: 'たべる', korean: '먹다', conjugations: { present: '食べます', negative: '食べません', past: '食べました', pastNegative: '食べませんでした' } },
    { word: '見る', reading: 'みる', korean: '보다', conjugations: { present: '見ます', negative: '見ません', past: '見ました', pastNegative: '見ませんでした' } },
    { word: '起きる', reading: 'おきだ', korean: '일어나다', conjugations: { present: '起きます', negative: '起きません', past: '起きました', pastNegative: '起きませんでした' } },
    { word: '寝る', reading: 'ねる', korean: '자다', conjugations: { present: '寝ます', negative: '寝ません', past: '寝ました', pastNegative: '寝ませんでした' } },
    { word: '教える', reading: 'おしえる', korean: '가르치다', conjugations: { present: '教えます', negative: '教えません', past: '教えました', pastNegative: '教えませんでした' } },
    { word: '覚える', reading: 'おぼえる', korean: '외우다', conjugations: { present: '覚えます', negative: '覚えません', past: '覚えました', pastNegative: '覚えませんでした' } },
    { word: '借りる', reading: 'かりる', korean: '빌리다', conjugations: { present: '借ります', negative: '借りません', past: '借りました', pastNegative: '借りませんでした' } },
    { word: 'いる', reading: 'いる', korean: '있다 (사람/동물)', conjugations: { present: 'います', negative: 'いません', past: 'いました', pastNegative: 'いませんでした' } },
    { word: 'する', reading: 'する', korean: '하다', conjugations: { present: 'します', negative: 'しません', past: 'しました', pastNegative: 'しませんでした' } },
    { word: '来る', reading: 'くる', korean: '오다', conjugations: { present: '来ます', negative: '来ません', past: '来ました', pastNegative: '来ませんでした' } },
  ]
};

const posMap = { 
  noun: { label: '명사', icon: BookText, color: 'sky' }, 
  i_adjective: { label: 'い형용사', icon: Sparkles, color: 'amber' }, 
  na_adjective: { label: '나형용사', icon: Palette, color: 'violet' }, 
  verb: { label: '동사', icon: PersonStanding, color: 'rose' } 
};

// 練習モードの時制リスト
const tenseOptions = [
  { key: 'present', label: '현재형' },
  { key: 'negative', label: '부정형' },
  { key: 'past', label: '과거형' },
  { key: 'pastNegative', label: '과거 부정형' },
  { key: 'random', label: '랜덤' }
];

const tenseMapKorean = { 
  present: '현재형', 
  negative: '부정형', 
  past: '과거형', 
  pastNegative: '과거 부정형',
  random: '랜덤'
};

// 配列をシャッフルするヘルパー関数
const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

// 学習者が間違えやすい選択肢を生成するヘルパー関数
const generateIncorrectOptions = (wordData, posType, tense, correctAnswer) => {
    const { word, conjugations } = wordData;
    let incorrectPool = [];

    if (posType === 'verb') {
        const stem = word.slice(0, -1);
        const dictForm = word;
        if (tense === 'present') {
            incorrectPool.push(dictForm + 'ます', stem + 'ります', stem + 'す');
        } else if (tense === 'negative') {
            incorrectPool.push(dictForm + 'ません', stem + 'ません', stem + 'りません', stem + 'ろません');
        } else if (tense === 'past') {
            incorrectPool.push(dictForm + 'ました', stem + 'りました', stem + 'した');
        } else if (tense === 'pastNegative') {
            incorrectPool.push(dictForm + 'ませんでした', stem + 'りませんでした', stem + 'ないでした');
        }
    } else if (posType === 'i_adjective') {
        const stem = word.slice(0, -1);
        if (tense === 'present') {
            incorrectPool.push(word + 'です', stem + 'です', word + 'ます');
        } else if (tense === 'negative') {
            incorrectPool.push(stem + 'ないです', word + 'じゃないです', stem + 'ありません');
        } else if (tense === 'past') {
            incorrectPool.push(word + 'でした', word + 'かったです', stem + 'でした', stem + 'かたです');
        } else if (tense === 'pastNegative') {
            incorrectPool.push(word + 'じゃなかったです', stem + 'くなかった', stem + 'なかったです');
        }
    } else if (posType === 'na_adjective' || posType === 'noun') {
        if (tense === 'present') {
            incorrectPool.push(word + 'い', word + 'ます');
        } else if (tense === 'negative') {
            incorrectPool.push(word + 'くないです', word + 'くない', word + 'くありません');
        } else if (tense === 'past') {
            incorrectPool.push(word + 'かったです', word + 'した');
        } else if (tense === 'pastNegative') {
            incorrectPool.push(word + 'くなかったです', word + 'くありませんでした');
        }
    }

    const allValidForms = Object.values(conjugations);
    allValidForms.forEach(f => incorrectPool.push(f));

    let alternativeCorrect = null;
    if (conjugations.negative_alt) {
        if (correctAnswer === conjugations.negative) alternativeCorrect = conjugations.negative_alt;
        if (correctAnswer === conjugations.negative_alt) alternativeCorrect = conjugations.negative;
        if (correctAnswer === conjugations.pastNegative) alternativeCorrect = conjugations.pastNegative_alt;
        if (correctAnswer === conjugations.pastNegative_alt) alternativeCorrect = conjugations.pastNegative;
    }

    const finalPool = [...new Set(incorrectPool)].filter(
        opt => opt && opt !== correctAnswer && opt !== alternativeCorrect
    );

    return shuffleArray(finalPool).slice(0, 2);
};

// ルール説明モーダルコンポーネント
const RuleExplanationModal = ({ posType, onClose }) => {
    const rules = {
        noun: {
            title: "명사 활용",
            example: "学生",
            color: "sky",
            data: [
                { tense: "현재형", form: [{ text: '学生', conjugated: false }, { text: 'です', conjugated: true }] },
                { tense: "부정형", form: [{ text: '学生', conjugated: false }, { text: 'じゃありません', conjugated: true }], form_alt: [{ text: '学生', conjugated: false }, { text: 'じゃないです', conjugated: true }] },
                { tense: "과거형", form: [{ text: '学生', conjugated: false }, { text: 'でした', conjugated: true }] },
                { tense: "과거 부정형", form: [{ text: '学生', conjugated: false }, { text: 'じゃありませんでした', conjugated: true }], form_alt: [{ text: '学生', conjugated: false }, { text: 'じゃなかったです', conjugated: true }] },
            ]
        },
        i_adjective: {
            title: "い형용사 활용",
            example: "大きい",
            color: "amber",
            data: [
                { tense: "현재형", form: [{ text: '大き', conjugated: false }, { text: 'いです', conjugated: true }] },
                { tense: "부정형", form: [{ text: '大き', conjugated: false }, { text: 'くありません', conjugated: true }], form_alt: [{ text: '大き', conjugated: false }, { text: 'くないです', conjugated: true }] },
                { tense: "과거형", form: [{ text: '大き', conjugated: false }, { text: 'かったです', conjugated: true }] },
                { tense: "과거 부정형", form: [{ text: '大き', conjugated: false }, { text: 'くありませんでした', conjugated: true }], form_alt: [{ text: '大き', conjugated: false }, { text: 'くなかったです', conjugated: true }] },
            ]
        },
        na_adjective: {
            title: "나형용사 활용",
            example: "静か",
            color: "violet",
            data: [
                { tense: "현재형", form: [{ text: '静か', conjugated: false }, { text: 'です', conjugated: true }] },
                { tense: "부정형", form: [{ text: '静か', conjugated: false }, { text: 'じゃありません', conjugated: true }], form_alt: [{ text: '静か', conjugated: false }, { text: 'じゃないです', conjugated: true }] },
                { tense: "과거형", form: [{ text: '静か', conjugated: false }, { text: 'でした', conjugated: true }] },
                { tense: "과거 부정형", form: [{ text: '静か', conjugated: false }, { text: 'じゃありませんでした', conjugated: true }], form_alt: [{ text: '静か', conjugated: false }, { text: 'じゃなかったです', conjugated: true }] },
            ]
        },
        verb: {
            title: "동사 활용 - ます형",
            example: "行きます",
            color: "rose",
            data: [
                { tense: "현재형", form: [{ text: '行き', conjugated: false }, { text: 'ます', conjugated: true }] },
                { tense: "부정형", form: [{ text: '行き', conjugated: false }, { text: 'ません', conjugated: true }] },
                { tense: "과거형", form: [{ text: '行き', conjugated: false }, { text: 'ました', conjugated: true }] },
                { tense: "과거 부정형", form: [{ text: '行き', conjugated: false }, { text: 'ませんでした', conjugated: true }] },
            ]
        }
    };

    const currentRule = rules[posType];
    const bgColor = `bg-${currentRule.color}-50`;
    const textColor = `text-${currentRule.color}-800`;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 transform animate-scale-up">
                <div className={`p-4 rounded-t-lg ${bgColor}`}>
                    <h3 className={`text-2xl font-bold ${textColor}`}>{currentRule.title}</h3>
                    <p className={`text-sm ${textColor} opacity-80`}>예: 「{currentRule.example}」</p>
                </div>
                <div className="p-4 space-y-3">
                    {currentRule.data.map((row, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-md">
                            <p className="font-semibold text-gray-500 text-sm">{row.tense}</p>
                            <p className="text-lg text-gray-800 font-mono">
                                {row.form.map((part, i) => (
                                    <span key={i} className={part.conjugated ? 'text-indigo-600 underline font-bold' : ''}>
                                        {part.text}
                                    </span>
                                ))}
                                {row.form_alt && (
                                    <>
                                        <span className="text-gray-400 mx-2">/</span>
                                        {row.form_alt.map((part, i) => (
                                            <span key={i} className={part.conjugated ? 'text-indigo-600 underline font-bold' : ''}>
                                                {part.text}
                                            </span>
                                        ))}
                                    </>
                                )}
                            </p>
                        </div>
                    ))}
                </div>
                <button onClick={onClose} className={`w-full mt-4 bg-${currentRule.color}-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-${currentRule.color}-600 transition-colors`}>
                    닫기
                </button>
            </div>
        </div>
    );
};

const App = () => {
  const [step, setStep] = useState('pos_select');
  const [posType, setPosType] = useState(null);
  const [tenseType, setTenseType] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answerHistory, setAnswerHistory] = useState([]);
  const [timer, setTimer] = useState(10);
  const [intervalId, setIntervalId] = useState(null);
  const [showRules, setShowRules] = useState(false);

  useEffect(() => {
    if (step === 'quiz' && !isAnswered) {
      setTimer(10);
      const id = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      setIntervalId(id);
      return () => clearInterval(id);
    }
  }, [currentIndex, step, isAnswered]);

  useEffect(() => {
    if (timer === 0 && !isAnswered) {
      if (intervalId) clearInterval(intervalId);
      setIsAnswered(true);
      setSelectedAnswer(null);
    }
  }, [timer, isAnswered, intervalId]);

  const handlePosSelect = (pos) => {
    setPosType(pos);
    setStep('tense_select');
  };

  const handleTenseSelect = (tense) => {
    setTenseType(tense);
    setupQuiz(posType, tense);
    setStep('quiz');
  };

  const setupQuiz = (pos, tense) => {
    const wordBank = quizData[pos];
    const shuffledWords = shuffleArray(wordBank).slice(0, 10);
    const availableTenses = ['present', 'negative', 'past', 'pastNegative'];

    const quizQuestions = shuffledWords.map(wordData => {
      const { conjugations } = wordData;
      const currentTense = tense === 'random' 
        ? availableTenses[Math.floor(Math.random() * availableTenses.length)] 
        : tense;

      let correctAnswer;
      if ((pos === 'noun' || pos.includes('adjective')) && conjugations.negative_alt) {
        if (currentTense === 'negative') {
          correctAnswer = Math.random() < 0.5 ? conjugations.negative : conjugations.negative_alt;
        } else if (currentTense === 'pastNegative') {
          correctAnswer = Math.random() < 0.5 ? conjugations.pastNegative : conjugations.pastNegative_alt;
        } else {
          correctAnswer = conjugations[currentTense];
        }
      } else {
        correctAnswer = conjugations[currentTense];
      }
      
      const incorrectAnswers = generateIncorrectOptions(wordData, pos, currentTense, correctAnswer);
      let options = shuffleArray([correctAnswer, ...incorrectAnswers]);
      
      if (options.length < 3) {
          const fallbackPool = [...new Set(wordBank.flatMap(w => Object.values(w.conjugations)))];
          const fallbackOptions = shuffleArray(fallbackPool.filter(opt => !options.includes(opt))).slice(0, 3 - options.length);
          options.push(...fallbackOptions);
          options = shuffleArray(options);
      }
      
      return { 
        ...wordData, 
        correctAnswer, 
        options: options.slice(0, 3),
        targetTenseLabel: tenseMapKorean[currentTense]
      };
    });
    setQuestions(quizQuestions);
  };

  const handleAnswerSelect = (answer) => {
    if (isAnswered) return;
    if (intervalId) clearInterval(intervalId);
    setSelectedAnswer(answer);
    setIsAnswered(true);
    if (answer === questions[currentIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    const currentQuestion = questions[currentIndex];
    setAnswerHistory(prev => [...prev, {
        word: currentQuestion.word,
        tense: currentQuestion.targetTenseLabel,
        selectedAnswer: selectedAnswer,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect: selectedAnswer === currentQuestion.correctAnswer
    }]);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setStep('result');
    }
  };

  const resetQuiz = () => {
    setStep('pos_select');
    setPosType(null);
    setTenseType(null);
    setQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setAnswerHistory([]);
  };

  const retrySameQuiz = () => {
    setScore(0);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setAnswerHistory([]);
    setupQuiz(posType, tenseType);
    setStep('quiz');
  };

  const renderContent = () => {
    switch (step) {
      case 'pos_select':
        return (
          <div className="text-center">
            <p className="text-gray-500 mb-6">학습하고 싶은 품사를 선택해 주세요.</p>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(posMap).map(key => {
                const Icon = posMap[key].icon;
                const color = posMap[key].color;
                return (
                  <button key={key} onClick={() => handlePosSelect(key)} className={`flex flex-col items-center justify-center p-6 bg-white border-2 border-gray-200 rounded-xl shadow-sm hover:border-${color}-300 hover:bg-${color}-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-500 transition-all duration-200 transform hover:scale-105`}>
                    <Icon className={`text-${color}-500 mb-2`} size={32} />
                    <span className="font-bold text-lg text-gray-800">{posMap[key].label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        );
      
      case 'tense_select':
        return (
          <>
            {showRules && <RuleExplanationModal posType={posType} onClose={() => setShowRules(false)} />}
            <div className="text-center">
                <div className="flex justify-between items-center mb-4">
                    <button onClick={() => setStep('pos_select')} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 font-medium">
                        <ArrowLeft size={14} />
                        품사 선택
                    </button>
                    <button onClick={() => setShowRules(true)} className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 font-bold">
                        <HelpCircle size={16} />
                        규칙 설명
                    </button>
                </div>
                <h2 className="text-xl font-semibold text-gray-700 mb-4 font-bold">시제 선택</h2>
                <div className="space-y-4">
                {tenseOptions.map(option => (
                    <button key={option.key} onClick={() => handleTenseSelect(option.key)} className="w-full sm:w-72 bg-white text-gray-800 font-semibold py-3 px-6 border-2 border-gray-300 rounded-lg shadow-md hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-all duration-200 transform hover:scale-105">
                    {option.label}
                    </button>
                ))}
                </div>
            </div>
          </>
        );

      case 'quiz':
        const currentQuestion = questions[currentIndex];
        if (!currentQuestion) return null;
        return (
          <div>
            <div className="flex justify-between items-center bg-indigo-50 p-3 rounded-lg mb-4">
              <button 
                onClick={resetQuiz} 
                className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                title="처음으로"
              >
                <Home size={24} />
              </button>
              <div className="text-lg font-semibold text-indigo-800">
                문제 {currentIndex + 1} / {questions.length}
              </div>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg text-white transition-colors duration-300 ${timer > 3 ? 'bg-green-500' : 'bg-red-500'}`}>
                {timer}
              </div>
              <div className="text-lg font-semibold text-indigo-800">
                Score: {score}
              </div>
            </div>
            <div className="mt-6 text-center bg-gray-100 p-6 rounded-lg border-2 border-indigo-100">
              <h3 className="text-3xl font-bold text-indigo-700 tracking-wider">{currentQuestion.word}</h3>
              <p className="text-gray-600 mt-1 font-medium">{currentQuestion.reading} ({currentQuestion.korean})</p>
              <p className="text-lg text-gray-800 mt-4 font-semibold">
                「<span className="text-indigo-700">{currentQuestion.targetTenseLabel}</span>」은?
              </p>
            </div>
            <div className="mt-6 space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isCorrect = option === currentQuestion.correctAnswer;
                let buttonClass = 'w-full text-left text-lg p-4 border-2 rounded-lg transition-colors duration-200 font-medium';
                if (isAnswered) {
                  if (isCorrect) {
                    buttonClass += ' bg-green-200 border-green-400 text-green-900 font-bold';
                  } else if (selectedAnswer === option) {
                    buttonClass += ' bg-red-200 border-red-400 text-red-900 font-bold';
                  } else {
                    buttonClass += ' bg-white border-gray-300 text-gray-800 opacity-60';
                  }
                } else {
                  buttonClass += ' bg-white border-gray-300 text-gray-800 hover:bg-indigo-50 hover:border-indigo-400';
                }
                return (
                  <button key={index} onClick={() => handleAnswerSelect(option)} disabled={isAnswered} className={buttonClass}>
                    {option}
                  </button>
                );
              })}
            </div>
            {isAnswered && (
              <button onClick={handleNextQuestion} className="w-full mt-6 flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-blue-700 transition-colors shadow-lg animate-fade-in">
                {currentIndex < questions.length - 1 ? '다음 문제로' : '결과 보기'}
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        );

      case 'result':
        return (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">퀴즈 종료!</h2>
            <div className="bg-indigo-100 p-6 rounded-xl shadow-inner border-2 border-indigo-200">
              <p className="text-xl text-indigo-800 font-medium">당신의 점수</p>
              <p className="text-6xl font-bold text-indigo-700 my-2">{score} / {questions.length}</p>
            </div>
            
            <div className="text-left">
                <h3 className="text-lg font-bold text-gray-800 mb-2 border-b-2 border-gray-100 pb-1">정답 확인</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto p-3 bg-gray-50 rounded-lg border shadow-inner">
                    {answerHistory.map((item, index) => (
                        <div key={index} className={`p-3 rounded-lg border-l-4 shadow-sm ${item.isCorrect ? 'border-green-500 bg-white' : 'border-red-500 bg-white'}`}>
                            <div className="flex justify-between items-center">
                                <p className="font-bold text-gray-800">Q{index + 1}. {item.word} ({item.tense})</p>
                                {item.isCorrect ? 
                                    <span className="flex items-center gap-1 text-green-600 font-bold"><Check size={16}/>정답</span> : 
                                    <span className="flex items-center gap-1 text-red-600 font-bold"><X size={16}/>오답</span>
                                }
                            </div>
                            {!item.isCorrect && (
                                <p className="text-sm text-red-700 mt-1">당신의 답변: <span className="font-medium">{item.selectedAnswer || '(시간 초과)'}</span></p>
                            )}
                            <p className="text-sm text-gray-600 mt-1">정확한 답변: <span className="text-indigo-600 font-bold">{item.correctAnswer}</span></p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-3 pt-2">
                <button onClick={retrySameQuiz} className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-indigo-700 transition-colors shadow-md">
                  <RefreshCw size={18} />
                  <span>다시 도전하기</span>
                </button>
                <button onClick={resetQuiz} className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-600 font-bold py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors">
                  <ArrowLeft size={18} />
                  <span>문제 선택으로 돌아가기</span>
                </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        @keyframes scale-up {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-up {
          animation: scale-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      <div style={{ fontFamily: "'BIZ UDPGothic', sans-serif" }} className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <GeometricBackground />
        <div className="w-full max-w-lg mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-10 border border-gray-100 relative">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight" style={{color: '#00529b'}}>품사별 시제 퀴즈</h1>
            <p className="text-gray-400 text-sm mt-2 font-medium uppercase tracking-widest">Japanese Tense Quiz</p>
          </header>
          {renderContent()}
          {step === 'pos_select' && (
              <footer className="text-center text-gray-400 text-xs mt-10 font-medium">
                  © Akihiro Suwa 2025
              </footer>
          )}
        </div>
      </div>
    </>
  );
};

export default App;