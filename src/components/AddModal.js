function AddModal({ addNation, setAddNation, addName, setAddName }) {
  return (
    <div>
      <div>
        <span>국가</span>
        <select
          value={addNation}
          onChange={(e) => setAddNation(e.target.value)}
        >
          <option value="USA">USA</option>
          <option value="KOREA">KOREA</option>
          <option value="UK">UK</option>
          <option value="CANADA">CANADA</option>
          <option value="JAPAN">JAPAN</option>
          <option value="ETC">ETC</option>
        </select>
      </div>

      <textarea
        rows={6}
        style={{ width: "100%" }}
        placeholder={`학교명을 줄바꿈으로 입력 (최대 5개)\n예) Goucher College\nClark University`}
        value={addName}
        onChange={(e) => setAddName(e.target.value)}
      />
    </div>
  );
}

export default AddModal;
