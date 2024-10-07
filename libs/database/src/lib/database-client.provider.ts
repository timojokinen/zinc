export default abstract class DatabaseClientProvider {
  abstract disconnect(): void | Promise<void>;
}
