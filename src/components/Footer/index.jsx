import Typography from "antd/es/typography/Typography";
export default function Footer() {
  return (
    <div className="footer-main">
      <Typography.Link href="https://www.google.com" target={"_blank"}>
        Privacy Policy
      </Typography.Link>
      <Typography.Link href="https://www.google.com" target={"_blank"}>
        Terms & Conditions
      </Typography.Link>
      <Typography.Link href="https://www.google.com" target={"_blank"}>
        Return Policy
      </Typography.Link>
      <Typography.Link href="tel:+123456789" target={"_blank"}>
        +123456789
      </Typography.Link>
    </div>
  );
}
