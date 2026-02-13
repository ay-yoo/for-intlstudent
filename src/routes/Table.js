import React, { useState, useEffect } from "react";
import { useMemo } from "react";

const makeSchool = (name, nation, rank = 1) => ({
  id: crypto.randomUUID(),
  name,
  rank,
  isFavorite: false,
  fields: {
    nation: nation,
    size: "",
    otherSchool: "",
    weather: "",
    walkscore: "",
    website: "",
    memo: "",
  },
});

function Table() {
  const [schools, setSchools] = useState([
    makeSchool("A school", "USA"),
    makeSchool("B school", "KOREA"),
    makeSchool("C school", "UK"),
  ]);
  //학교 삭제 시 실행
  const onDelete = (id) => {
    setSchools((prev) => prev.filter((s) => s.id !== id));
    console.log(schools);
  };
  //학교 순위별 정렬
  const sortedSchools = useMemo(() => {
    return [...schools].sort((a, b) => a.rank - b.rank);
  }, [schools]);
  //기본정보 수정
  const updateBasic = (id, field, value) => {
    setSchools((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    );
  };
  //field 수정
  const updateField = (id, field, value) => {
    setSchools((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              fields: {
                ...s.fields,
                [field]: value,
              },
            }
          : s,
      ),
    );
    console.log(schools);
  };
  return (
    <div>
      <h1>희망학교 리스트</h1>

      <div>
        <table>
          <thead>
            <tr>
              <td>순위</td>
              <td>학교명</td>
              <td>국가</td>
              <td>규모</td>
              <td>타 학교 제휴</td>
              <td>날씨</td>

              <td>워크스코어</td>
              <td>국제교류처</td>
              <td>메모</td>
            </tr>
          </thead>

          <tbody>
            {sortedSchools.map((s) => (
              <tr key={s.id}>
                <td>{s.rank}</td>
                <td>{s.name}</td>
                <td>{s.fields.nation}</td>
                <td>{s.fields.sizw}</td>
                <td>{s.fields.otherSchool}</td>
                <td>{s.fields.weather}</td>
                <td>{s.fields.walkscore}</td>
                <td>
                  <input
                    type="text"
                    value={s.fields.website}
                    onChange={(e) =>
                      updateField(s.id, "website", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    type="text"
                    value={s.fields.memo}
                    onChange={(e) => updateField(s.id, "memo", e.target.value)}
                  />
                </td>
                <td>
                  <button onClick={() => onDelete(s.id)}>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
