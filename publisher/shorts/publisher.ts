import amqp from "amqplib";
import { environment } from "../../utils/environment";
import { TShortsSchema } from "./schema";

export async function shortsPublish(data: TShortsSchema) {
  const queueName = "asocialmedia.upload.shorts";
  const connection = await amqp.connect(environment.RABBITMQ_URL);
  const channel = await connection.createChannel();

  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
}
