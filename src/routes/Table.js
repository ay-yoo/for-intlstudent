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
    makeSchool("Harvard University", "미국"),
    makeSchool("Yale University", "미국"),
    makeSchool("Brown University", "미국"),
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

  //자동입력
  const handleAiFill = async (schoolId) => {
    try {
      setLoadingId(schoolId);
      const school = schools.find((s) => s.id === schoolId);
      if (!school) return;

      const geminiRes = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schoolName: school.name }),
      });
      const geminiData = await geminiRes.json();

      const searchQuery = geminiData.centralAddress || school.name;

      let walkscoreValue = "";
      const geoRes = await fetch(
        `/api/geocode?q=${encodeURIComponent(searchQuery)}`,
      );
      const geoData = await geoRes.json();

      if (geoData.lat && geoData.lon) {
        const wsRes = await fetch(
          `/api/walkscore?lat=${geoData.lat}&lon=${geoData.lon}&address=${encodeURIComponent(geoData.display_name)}`,
        );
        const wsData = await wsRes.json();

        if (wsData.status === 1 || wsData.walkscore !== undefined) {
          walkscoreValue = String(wsData.walkscore);
        }
      }

      // 5. 최종 State 업데이트
      setSchools((prev) =>
        prev.map((s) =>
          s.id === schoolId
            ? {
                ...s,
                fields: {
                  ...s.fields,
                  size: geminiData.size || s.fields.size,
                  otherSchool: geminiData.otherSchool || s.fields.otherSchool,
                  weather: geminiData.weather || s.fields.weather,
                  walkscore: walkscoreValue || s.fields.walkscore,
                },
              }
            : s,
        ),
      );
    } catch (err) {
      console.error("자동 채움 실패", err);
      alert("정보를 가져오는 중 오류가 발생했습니다.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="app-container">
      <div className="header-section">
        {" "}
        <h1>희망학교 리스트</h1>
        <button className="btn btn-primary" onClick={onAddOpen}>
          학교 추가하기
        </button>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>순위</th>
              <th>학교명</th>
              <th>국가</th>
              <th>규모</th>
              <th>타 학교 제휴</th>
              <th>날씨</th>

              <th>워크스코어</th>
              <th>국제교류처</th>
              <th>메모</th>
              <th></th>
              <th></th>
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
                    className="table-input"
                    value={s.fields.website}
                    onChange={(e) =>
                      updateField(s.id, "website", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    type="text"
                    className="table-input"
                    value={s.fields.memo}
                    onChange={(e) => updateField(s.id, "memo", e.target.value)}
                  />
                </td>
                <td className="action-btns">
                  <button
                    className="btn btn-ai"
                    onClick={() => handleAiFill(s.id)}
                    disabled={loadingId === s.id}
                  >
                    {loadingId === s.id ? "로딩 중..." : "AI"}
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => onDelete(s.id)}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
  );
}

export default Table;
