import { useState } from "react";
import { useNavigate } from "react-router";
import type { Route } from "../../+types/root";
import { Button } from "~/common/components/ui/button";
import { Input } from "~/common/components/ui/input";
import { Progress } from "~/common/components/ui/progress";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/common/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/common/components/ui/dialog";

export function loader() {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "설문조사 - Ready to Play" },
    { name: "description", content: "Ready to Play 설문조사 페이지입니다." },
  ];
};

type EliteLevel = "Middle" | "High" | "college";

interface SurveyData {
  position: string;
  detailPosition: string;
  isElite: EliteLevel;
  experience: number;
  height: number;
  referralSource: string;
}

interface BasketballSurveyRequest {
  userUuid: string;
  sportType: "BASKETBALL";
  position: string;
  detailPosition: string;
  height: number;
  isElite: EliteLevel;
  experience: number;
}

interface BasketballSurveyResponse {
  userSportsDetailId: string;
}

interface Question {
  id: keyof SurveyData;
  title: string;
  type: "select" | "number";
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
}

const questions: Question[] = [
  {
    id: "position",
    title: "주 포지션을 선택해주세요",
    type: "select",
    options: [
      { value: "Guard", label: "가드" },
      { value: "Forward", label: "포워드" },
      { value: "Center", label: "센터" },
    ],
  },
  {
    id: "detailPosition",
    title: "세부 포지션을 선택해주세요",
    type: "select",
    options: [
      { value: "Point Guard", label: "포인트 가드" },
      { value: "Shooting Guard", label: "슈팅 가드" },
      { value: "Small Forward", label: "스몰 포워드" },
      { value: "Power Forward", label: "파워 포워드" },
      { value: "Center", label: "센터" },
    ],
  },
  {
    id: "isElite",
    title: "엘리트 선수 경험 수준을 선택해주세요",
    type: "select",
    options: [
      { value: "Middle", label: "중학교" },
      { value: "High", label: "고등학교" },
      { value: "college", label: "대학교" },
    ],
  },
  {
    id: "experience",
    title: "농구를 하신 지 얼마나 되셨나요?",
    type: "select",
    options: [
      { value: "0", label: "처음이에요" },
      { value: "1", label: "1년 이하" },
      { value: "3", label: "3년 이하" },
      { value: "5", label: "5년 이하" },
      { value: "6", label: "5년 이상" },
    ],
  },
  {
    id: "height",
    title: "키가 어떻게 되시나요? (cm)",
    type: "number",
    min: 100,
    max: 250,
  },
  {
    id: "referralSource",
    title: "RtP를 어떻게 알게 되셨나요?",
    type: "select",
    options: [
      { value: "sns", label: "SNS" },
      { value: "friend", label: "지인 추천" },
      { value: "search", label: "검색" },
      { value: "ad", label: "광고" },
      { value: "other", label: "기타" },
    ],
  },
];

const getDetailPositionOptions = (position: string) => {
  const positionMap: { [key: string]: string[] } = {
    pg: ["floor-general", "scorer", "defender"],
    sg: ["3and_d", "slasher", "combo_guard"],
    sf: ["3and_d", "slasher", "defender", "point_forward"],
    pf: ["stretch4", "traditional", "point_forward"],
    c: ["rim_protector", "scoring_center", "floor_spacer"],
  };

  const availableOptions = positionMap[position] || [];
  return (
    questions[1].options?.filter((option) =>
      availableOptions.includes(option.value)
    ) || []
  );
};

export default function SurveyPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<SurveyData>({
    position: "",
    detailPosition: "",
    isElite: "Middle",
    experience: 0,
    height: 170,
    referralSource: "",
  });

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleNext = () => {
    if (currentStep === questions.length - 1) {
      setShowSuccess(true);
      setTimeout(() => navigate("/home"), 3000);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleChange = (value: string | number) => {
    setFormData({
      ...formData,
      [currentQuestion.id]: value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <Progress value={progress} className="w-full" />
          <CardTitle className="text-2xl font-bold mt-4">
            {currentQuestion.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentQuestion.type === "select" ? (
            <div className="space-y-2">
              {currentQuestion.options?.map((option) => (
                <Button
                  key={option.value}
                  variant={
                    formData[currentQuestion.id] === option.value
                      ? "default"
                      : "outline"
                  }
                  className="w-full justify-start"
                  onClick={() => handleChange(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          ) : (
            <Input
              type="number"
              value={formData[currentQuestion.id]}
              onChange={(e) => handleChange(Number(e.target.value))}
              min={currentQuestion.min}
              max={currentQuestion.max}
            />
          )}

          <div className="flex justify-between gap-4 mt-6">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 0}
            >
              이전
            </Button>
            <Button onClick={handleNext}>
              {currentStep === questions.length - 1 ? "완료" : "다음"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>설문 완료</DialogTitle>
          </DialogHeader>
          <p className="text-center text-muted-foreground">
            설문이 완료되었습니다.
            <br />
            잠시 후 메인 페이지로 이동합니다.
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
