import sjcl from "sjcl";

export const decrypt = ({ password, iv, salt, ct }) => {
  // ct - message // salt,iv
  const schema = `{"iv":"${iv}","v":1,"iter":10000,"ks":128,"ts":64,"mode":"ccm","adata":"","cipher":"aes","salt":"${salt}","ct":"${ct}"}`;

  return sjcl.decrypt(password, schema);
};
