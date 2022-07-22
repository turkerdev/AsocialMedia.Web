import amqp from "amqplib";
import { environment } from "../../utils/environment";
import { TBasicSchema } from "./schema";

export async function basicPublish(data: TBasicSchema) {
  const queueName = "asocialmedia.upload.basic";
  const connection = await amqp.connect(environment.RABBITMQ_URL);
  const channel = await connection.createChannel();

  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
}
