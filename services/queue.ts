import amqp from "amqplib";
import { z, ZodTypeAny } from "zod";
import { environment } from "../utils/environment";

export async function PublishToQueue<T extends ZodTypeAny>(
  queueName: string,
  schema: T,
  body: z.input<T>
) {
  const data = await schema.parseAsync(body);

  const connection = await amqp.connect(environment.RABBITMQ_URL);
  const channel = await connection.createChannel();

  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
}
