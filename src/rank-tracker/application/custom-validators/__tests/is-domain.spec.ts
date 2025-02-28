import { isDomainValidator } from '../is-domain';

describe('isDomainValidator', () => {
  it('should return true when value is a valid domain', () => {
    const domain1 = isDomainValidator('test.pl');
    const domain2 = isDomainValidator('test.com.pl');
    const domain3 = isDomainValidator('app.test.com.pl');
    expect(domain1).toBeTruthy();
    expect(domain2).toBeTruthy();
    expect(domain3).toBeTruthy();
  });
  it('should return false when value is an invalid domain', () => {
    const domain1 = isDomainValidator('xxxx');
    const domain2 = isDomainValidator('123123');
    const domain3 = isDomainValidator('https://test.pl');
    const domain4 = isDomainValidator('https://www.wp.pl');
    const domain5 = isDomainValidator('https://dasdas');
    const domain6 = isDomainValidator('http://test.pl');
    const domain7 = isDomainValidator('http://www.wp.pl');
    const domain8 = isDomainValidator('http://www.test.wp.pl');
    const domain9 = isDomainValidator('http://test.wp.pl');
    const domain10 = isDomainValidator('https://www.test.wp.pl');
    const domain11 = isDomainValidator('https://test.wp.pl');
    const domain12 = isDomainValidator('test.pl/something');

    expect(domain1).toBeFalsy();
    expect(domain2).toBeFalsy();
    expect(domain3).toBeFalsy();
    expect(domain4).toBeFalsy();
    expect(domain5).toBeFalsy();
    expect(domain6).toBeFalsy();
    expect(domain7).toBeFalsy();
    expect(domain8).toBeFalsy();
    expect(domain9).toBeFalsy();
    expect(domain10).toBeFalsy();
    expect(domain11).toBeFalsy();
    expect(domain12).toBeFalsy();
  });
});
