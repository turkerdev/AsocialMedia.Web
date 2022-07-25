import amqp from "amqplib";
import { environment } from "../../utils/environment";
import { ShortsOutput } from "./schema";

export async function shortsPublish(data: ShortsOutput) {
  const queueName = "asocialmedia.upload.shorts";
  const connection = await amqp.connect(environment.RABBITMQ_URL);
  const channel = await connection.createChannel();

  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
}
