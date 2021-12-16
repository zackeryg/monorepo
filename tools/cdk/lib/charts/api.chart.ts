import * as cdk8s from 'cdk8s';
import * as kplus from 'cdk8s-plus-21';



export default function getAppChart(id: string, port: number, image: string) {
  const app = new cdk8s.App();

  const chart = new cdk8s.Chart(app, id);

  const api = new kplus.Deployment(chart, id, {
    containers: [{ image }]
  });
  
  api.exposeViaService({
    port: 3000
  });

  return chart;
}

