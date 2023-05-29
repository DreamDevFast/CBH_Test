const { deterministicPartitionKey } = require("./dpk");

const crypto = require("crypto");

describe('deterministicPartitionKey', () => {
  it('returns "0" when event is null', () => {
    expect(deterministicPartitionKey(null)).toBe("0");
  });

  it('returns "0" when event is undefined', () => {
    expect(deterministicPartitionKey(undefined)).toBe("0");
  });

  it('returns a string event.partitionKey with length smaller than MAX_PARTITION_KEY_LENGTH when provided', () => {
    const event = { partitionKey: "key123" };
    expect(deterministicPartitionKey(event)).toBe("key123");
  });

  it('returns a hash of event.partitionKey with length exceeding MAX_PARTITION_KEY_LENGTH when provided', () => {
    const event = { partitionKey: "key123" };
    const hash = crypto.createHash("sha3-512").update("key123").digest("hex");
    expect(deterministicPartitionKey(event)).toBe("key123");
  });

  it('returns the same hash when called with the same event data', () => {
    const event = { data: "Hello, World!" };

    const hash1 = deterministicPartitionKey(event);
    const hash2 = deterministicPartitionKey(event);

    expect(hash1).toBe(hash2);
  });

  it('returns a hash when event.partitionKey is not provided', () => {
    const event = { data: "Hello, World!" };
    const data = JSON.stringify(event);
    const expectedHash = crypto.createHash("sha3-512").update(data).digest("hex");

    expect(deterministicPartitionKey(event)).toBe(expectedHash);
  });

  it('handles non-string partitionKey with length exceeding MAX_PARTITION_KEY_LENGTH', () => {
    const nonStringPartitionKey = { partitionKey: 'a'.repeat(1000) };
    const event = { partitionKey: nonStringPartitionKey };
    const expectedHash = crypto.createHash("sha3-512")
      .update(JSON.stringify(nonStringPartitionKey))
      .digest("hex");
  
    expect(deterministicPartitionKey(event)).toBe(expectedHash);
  });

  it('returns a stringified string of a non-string partitionKey with length smaller than MAX_PARTITION_KEY_LENGTH', () => {
    const nonStringPartitionKey = { partitionKey: 'value' };
    const event = { partitionKey: nonStringPartitionKey };
    const expectedString = JSON.stringify(nonStringPartitionKey)
  
    expect(deterministicPartitionKey(event)).toBe(expectedString);
  });
});
