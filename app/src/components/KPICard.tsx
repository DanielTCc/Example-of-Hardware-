import { Card, CardContent, Typography } from "@mui/material";

export default function KPICard(props: {
  title: string;
  value: string;
  subtitle?: string;
}) {
  return (
    <Card>
      <CardContent>
        <Typography variant="overline" color="text.secondary">
          {props.title}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5 }}>
          {props.value}
        </Typography>
        {props.subtitle ? (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {props.subtitle}
          </Typography>
        ) : null}
      </CardContent>
    </Card>
  );
}