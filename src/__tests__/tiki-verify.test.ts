/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { Tiki } from '../tiki/tiki';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const env = getMiniflareBindings() as Env;

describe('TIKI verify signature', function () {
  test('verify', async () => {
    const pubKey =
      'MIICITANBgkqhkiG9w0BAQEFAAOCAg4AMIICCQKCAQEAuRqjFmWr9aithaKShIOxSj+F7FLdVotAEakJkMrNJYw0sd7V1RN2JyXC/EoPxwLtKqYKWOV9nEnP2jU/+9OSUIxhWxT0y4JkqKxRO4VimZ6c1tyrFWyfyb2TqvhEo/+dMCJgU52fz50dULUJRATsAnWfjrbihjOlvVpD7y/T6YYPgMbky1mdF4dlw1u7dujMaFmCK4aNv4u8tzH1s4G4222UmGSoSAieQqoTLVtlnUhXVpebkN0BiiVwZLD8ctOr65H8+NuAozCFjlUU6tRQb3uu0Fl6adjpKjTrV3VVu4FbJ78D/xxaDp+W1yi1Iipm3bU8OgdzEwxRzvSKc+F2IwKCAQBcjVGLMtX61FbC0UlCQdilH8L2KW6rRaAI1ITIZWaSxhpY72rqibsTkuF+JQfjgXaVUwUscr7OJOftGp/96ckoRjCtinplwTJUViidwrFMz05rblWKtk/k3snVfCJR/86YETApzs/nzo6oWoSiAnYBOs/HW3FDGdLerSH3l+n0wis7X0e6QAd+vIjSv3eIMPHOPWKZ2HSxGQ2fE0RI/sXSOhhyKx4b+bqQU/4U3zNy56NbOegGoGMgguc9z+mi1KmG9+sRvx8fEt3yRP45oEFtJnDkYPSYMOenpy3M/RP77eW60Fw/bCMusTEKGExV53WIlefGQBy5likWIPiMOeoJ';
    const signature =
      'miwMc9hJhLoVC4btINuiiRSRC3m+70c5SdE4SMJHJPeYfg39pHIuVyczkpRzewHP3h49+6doVThIZdlt7gArEFwVyiKkx9IaE2Doo+up7kh3V1tvJstVMupSv++so5U2XhiTulk7oi7BMqYJh247CFyAVu1RvB6DTuMjJb/gSNIoUDlPtCCz6us9xhwCtaXKqk+DTNnavoWETg7C21t8ZnZW1DiPjcP3SRTUMtcaB8PEP/meKQ2dskxBAj3/hraibQARsqxbiGalSQ7BkUCXuRy1qlE2jpcDNUuVtyWntX07bnxzgPeLMXxKI5BPq+weXlUc++781i7Dkgvc+MvlKQ==';
    const body = JSON.stringify({
      shop: 'tiki-dev-store.myshopify.com',
      customerId: 7053185876285,
      discountId: 'TID',
    });
    const tiki = new Tiki(env);
    const validSig = await tiki.verifyRsa(
      b64Decode(pubKey),
      signature as string,
      body
    );
    expect(validSig === true);
  });
});

const b64Decode = (b64: string): Uint8Array =>
  Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
