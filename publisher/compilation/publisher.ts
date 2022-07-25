import amqp from "amqplib";
import { environment } from "../../utils/environment";
import { CompilationOutput } from "./schema";

export async function compilationPublish(data: CompilationOutput) {
  const queueName = "asocialmedia.upload.compilation";
  const connection = await amqp.connect(environment.RABBITMQ_URL);
  const channel = await connection.createChannel();

  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
}
