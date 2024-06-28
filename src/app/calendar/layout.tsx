import Header from "@/components/common/Header";

type Props = {
  children: React.ReactNode;
};

export default function ChargeLayout({children}: Props) {
  return (
    <div>
      {/* <div>요급제 레이아웃 입니다.</div> */}
      <Header></Header>
      <div>{children}</div>
    </div>
  );
}
