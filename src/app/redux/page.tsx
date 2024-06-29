import RQProvider from "@/libs/ReactQuery/RQProvider.client";
import ReduxProvider from "@/libs/Redux/ReduxProvier.client";
import {Count} from "./_components/Count";

export default function ReduxPage() {
  // 리덕스 provider 테스트
  return (
    <div>
      <div>ssr 페이지임</div>
      <RQProvider>
        <ReduxProvider>
          <Count></Count>
        </ReduxProvider>
      </RQProvider>
    </div>
  );
}
