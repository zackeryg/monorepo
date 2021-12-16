import * as cdk8s from 'cdk8s';
import * as kplus from 'cdk8s-plus-21';
import { EnvValue, IngressV1Beta1 } from 'cdk8s-plus-21';



export default function getAppChart(id: string, port: number, image: string, env: Record<string, EnvValue>) {
  const app = new cdk8s.App();

  const chart = new cdk8s.Chart(app, id);

  const api = new kplus.Deployment(chart, id, {
    containers: [{ image, env }],
  });
  
  const apiService = api.exposeViaService({
    port: 3000,
  });

  const ingress = new IngressV1Beta1(chart, `${id}-ingress`, {
    metadata: {
      annotations: {
        'kubernetes.io/ingress.class': 'alb',
        'alb.ingress.kubernetes.io/scheme': 'internet-facing',
        'alb.ingress.kubernetes.io/target-type': 'ip'
      }
    }
  })
  ingress.addDefaultBackend(kplus.IngressV1Beta1Backend.fromService(apiService))

  return chart;
}

