import { useState, useRef } from "react";
import Selecto from "react-selecto";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/common/components/ui/table";

const days = ["월", "화", "수", "목", "금", "토", "일"];

// 30분 단위 시간 범위 (오전 6시 ~ 새벽 1시까지만 표시)
const hours = Array.from({ length: 48 }, (_, i) => {
  const startHour = Math.floor(i / 2);
  const startMinute = i % 2 === 0 ? "00" : "30";
  const endHour = i % 2 === 0 ? startHour : startHour + 1;
  const endMinute = i % 2 === 0 ? "30" : "00";
  return {
    label: `${startHour}:${startMinute} - ${endHour}:${endMinute}`,
    hour: startHour,
  };
}).filter(({ hour }) => hour >= 6 || hour < 1); // 오전 6시 ~ 새벽 1시까지만 표시

export default function SelectoTimeTable() {
  const [selectedCells, setSelectedCells] = useState(new Set());
  const selectoRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateSelection = (selectedElements: HTMLElement[]) => {
    const newSelection = new Set();
    selectedElements.forEach((el) => {
      const day = el.dataset.day;
      const hour = el.dataset.hour;
      if (day !== undefined && hour !== undefined) {
        newSelection.add(`${day}-${hour}`);
      }
    });
    setSelectedCells(newSelection);
  };

  return (
    <div className="relative w-full h-[80vh] overflow-auto" ref={containerRef}>
      <Table className="w-full border">
        <TableHeader className="sticky top-0 z-20 bg-white border-b">
          <TableRow>
            <TableHead className="sticky left-0 top-0 z-30 bg-white w-[120px] cursor-default select-none border-r">
              시간\요일
            </TableHead>
            {days.map((day) => (
              <TableHead
                key={day}
                className="sticky top-0 z-20 bg-white text-center cursor-default select-none border-b"
              >
                {day}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {hours.map(({ label }, halfHourIndex) => (
            <TableRow key={label}>
              <TableCell className="sticky left-0 z-10 bg-white w-[120px] font-medium text-center cursor-default select-none h-[20px] leading-none p-2 whitespace-nowrap border-r">
                {label}
              </TableCell>
              {days.map((day, dayIndex) => {
                const cellId = `${dayIndex}-${halfHourIndex}`;
                const isActive = selectedCells.has(cellId);

                return (
                  <TableCell
                    key={cellId}
                    data-day={dayIndex}
                    data-hour={halfHourIndex}
                    className={`h-6 cursor-pointer text-center selecto-cell ${
                      isActive ? "bg-blue-500/70 text-white" : "bg-gray-100"
                    }`}
                  />
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Selecto 적용 (드래그 다중 선택 가능, 실시간 반영) */}
      <Selecto
        ref={selectoRef}
        container={containerRef.current}
        selectableTargets={[".selecto-cell"]}
        hitRate={0} // 드래그 범위가 셀에 맞으면 선택됨
        selectByClick={true} // 클릭으로도 선택 가능
        selectFromInside={true} // 내부에서도 선택 가능
        toggleContinueSelect={["shift"]}
        preventDefault={true} // 모바일에서 터치 시 스크롤 방지
        onDragStart={(e) => {
          e.inputEvent.preventDefault(); // 모바일 터치 시 스크롤 방지
        }}
        onSelect={(e) => {
          updateSelection(e.selected as HTMLElement[]); // 드래그 중에도 실시간 반영
        }}
        onSelectEnd={(e) => {
          updateSelection(e.selected as HTMLElement[]); // 최종 선택 반영
        }}
      />
    </div>
  );
}
