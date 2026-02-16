import React, { useState } from "react";
import { useMemo } from "react";
import Modal from "../components/Modal";
import AddModal from "../components/AddModal";

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
  //*STATE*//
  const [schools, setSchools] = useState([
    makeSchool("Yale university", "USA"),
    makeSchool("Montana state university", "KOREA"),
    makeSchool("Brown unviersity", "UK"),
  ]);
  //학교 추가 모달 state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [addName, setAddName] = useState(""); // 학교명
  const [addNation, setAddNation] = useState("USA"); // 국가
  //로딩 state
  const [loadingId, setLoadingId] = useState(null);

  //*FUNCTION*//
  //학교 추가 클릭시 실행
  const onAddOpen = () => setIsAddOpen(true);

  //모달 닫을때 실행
  const onAddClose = () => {
    setIsAddOpen(false);
  };

  //학교 삭제 시 실행
  const onDelete = (id) => {
    setSchools((prev) => prev.filter((s) => s.id !== id));
    console.log(schools);
  };
  {
    /*  //기본정보 수정
  const updateBasic = (id, field, value) => {
    setSchools((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    );
  };*/
  }

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

  //학교 추가
  // 학교 추가 함수
  const addSchool = () => {
    const inputNames = addName
      .split("\n")
      .map((name) => name.trim())
      .slice(0, 5);

    const existingNames = schools.map((s) => s.name.toLowerCase());

    const newSchools = inputNames
      .filter((name) => !existingNames.includes(name.toLowerCase()))
      .map((name) => makeSchool(name, addNation));

    setSchools((prev) => [...prev, ...newSchools]);
    console.log(schools);
    setAddName("");
    setAddNation("미국");
  };

  //학교 순위별 정렬
  const sortedSchools = useMemo(() => {
    return [...schools].sort((a, b) => a.rank - b.rank);
  }, [schools]);
  const handleAiFill = async (schoolId) => {
    try {
      setLoadingId(schoolId);
      const school = schools.find((s) => s.id === schoolId);

      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schoolName: school.name }),
      });

      const data = await res.json();

      setSchools((prev) =>
        prev.map((s) =>
          s.id === schoolId
            ? {
                ...s,
                fields: {
                  ...s.fields,
                  size: data.size,
                  // data.exchange 대신 data.otherSchool로 수정
                  otherSchool: data.otherSchool,
                  weather: data.weather,
                },
              }
            : s,
        ),
      );
    } catch (err) {
      console.error("AI 자동 채움 실패", err);
      alert("AI 자동 채움에 실패했습니다 🥲");
    } finally {
      setLoadingId(null);
    }
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
                <td>{s.fields.size}</td>
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
                <td>
                  <button
                    onClick={() => handleAiFill(s.id)}
                    disabled={loadingId === s.id}
                  >
                    {loadingId === s.id ? "로딩 중..." : "AI"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal
          isOpen={isAddOpen}
          title="학교 추가"
          onClose={onAddClose}
          children={
            <AddModal
              addNation={addNation}
              setAddNation={setAddNation}
              addName={addName}
              setAddName={setAddName}
              addSchool={addSchool}
            />
          }
        />
      </div>
    </div>
  );
}

export default Table;
