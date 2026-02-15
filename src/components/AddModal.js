function AddModal({ addNation, setAddNation, addName, setAddName, addSchool }) {
  return (
    <div>
      <div>
        <span>국가</span>
        <select
          value={addNation}
          onChange={(e) => setAddNation(e.target.value)}
        >
          <option value="미국">미국</option>
          <option value="일본">일본</option>
          <option value="네덜란드">네덜란드</option>
          <option value="노르웨이">노르웨이</option>
          <option value="대만">대만</option>
          <option value="덴마크">덴마크</option>
          <option value="독일">독일</option>
          <option value="리투아니아">리투아니아</option>
          <option value="말레이시아">말레이시아</option>
          <option value="베트남">베트남</option>
          <option value="벨기에">벨기에</option>
          <option value="스웨덴">스웨덴</option>
          <option value="스위스">스위스</option>
          <option value="스페인">스페인</option>
          <option value="싱가포르">싱가포르</option>
          <option value="영국">영국</option>
          <option value="오스트리아">오스트리아</option>
          <option value="이탈리아">이탈리아</option>
          <option value="인도">인도</option>
          <option value="중국">중국</option>
          <option value="캐나다">캐나다</option>
          <option value="태국">태국</option>
          <option value="폴란드">폴란드</option>
          <option value="프랑스">프랑스</option>
          <option value="핀란드">핀란드</option>
          <option value="호주">호주</option>
          <option value="홍콩">홍콩</option>
        </select>
      </div>

      <textarea
        rows={6}
        placeholder={`학교명을 줄바꿈으로 입력 (최대 5개)\n예) Goucher College\nClark University`}
        value={addName}
        onChange={(e) => setAddName(e.target.value)}
      />
      <button onClick={addSchool}>학교 추가</button>
    </div>
  );
}

export default AddModal;
