const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

function hashData(data) {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}

function getCandidateFromEvent(event) {
  if (!event) {
    return null
  }
  
  if (event.partitionKey) {
    return event.partitionKey;
  }

  return hashData(JSON.stringify(event));
}

exports.deterministicPartitionKey = (event) => {
  const candidate = getCandidateFromEvent(event) || TRIVIAL_PARTITION_KEY;
  const candidateAsString = typeof candidate === "string" ? candidate : JSON.stringify(candidate);

  return candidateAsString.length > MAX_PARTITION_KEY_LENGTH
    ? hashData(candidateAsString)
    : candidateAsString;
};