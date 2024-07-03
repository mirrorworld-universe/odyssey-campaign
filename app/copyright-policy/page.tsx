import { Footer } from "../components/Basic/Footer";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  return {
    title: `Copyright Policy - Sonic Odyssey`,
  };
}

export default function CopyrightPolicy() {
  return (
    <>
      <div className="doc-content max-w-6xl mx-auto my-20 px-10 text-white font-serif">
        <p className="text-center text-2xl py-10">
          <strong>Copyright Policy</strong>
        </p>
        <p>
          <strong>Reporting Claims of Copyright Infringement</strong>
        </p>
        <p>
          We take claims of copyright infringement seriously. We will respond to
          notices of alleged copyright infringement that comply with applicable
          law. If you believe any materials accessible on or from this site (the
          "<strong>Website</strong>") infringe your copyright, you may request
          removal of those materials (or access to them) from the Website by
          submitting written notification to our copyright agent (designated
          below). In accordance with the Online Copyright Infringement Liability
          Limitation Act of the Digital Millennium Copyright Act (17 U.S.C. §
          512) ("<strong>DMCA</strong>"), the written notice (the "
          <strong>DMCA Notice</strong>") must include substantially the
          following:
        </p>
        <ul className="list-disc pl-4">
          <li>Your physical or electronic signature.</li>
          <li>
            Identification of the copyrighted work you believe to have been
            infringed or, if the claim involves multiple works on the Website, a
            representative list of such works.
          </li>
          <li>
            Identification of the material you believe to be infringing in a
            sufficiently precise manner to allow us to locate that material.
          </li>
          <li>
            Adequate information by which we can contact you (including your
            name, postal address, telephone number, and, if available, email
            address).
          </li>
          <li>
            A statement that you have a good faith belief that use of the
            copyrighted material is not authorized by the copyright owner, its
            agent, or the law.
          </li>
          <li>
            A statement that the information in the written notice is accurate.
          </li>
          <li>
            A statement, under penalty of perjury, that you are authorized to
            act on behalf of the copyright owner.
          </li>
        </ul>
        <p>
          You can email our designated copyright agent to receive DMCA Notices
          via&nbsp;
          <span className="underline">
            <a target="_blank" href="mailto:copyright@sonic.game">
              copyright@sonic.game
            </a>
          </span>
          .
        </p>
        <p>
          If you fail to comply with all of the requirements of Section
          512(c)(3) of the DMCA, your DMCA Notice may not be effective.
        </p>
        <p>
          Please be aware that if you knowingly materially misrepresent that
          material or activity on the Website is infringing your copyright, you
          may be held liable for damages (including costs and attorneys' fees)
          under Section 512(f) of the DMCA.
        </p>

        <p className="mt-4">
          <strong>Counter Notification Procedures</strong>
        </p>
        <p>
          If you believe that material you posted on the Website was removed or
          access to it was disabled by mistake or misidentification, you may
          file a counter notification with us (a "
          <strong>Counter Notice</strong>") by submitting written notification
          to our copyright agent designated above. Pursuant to the DMCA, the
          Counter Notice must include substantially the following:
        </p>
        <ul className="list-disc pl-4">
          <li>Your physical or electronic signature.</li>
          <li>
            An identification of the material that has been removed or to which
            access has been disabled and the location at which the material
            appeared before it was removed or access disabled.
          </li>
          <li>
            Adequate information by which we can contact you (including your
            name, postal address, telephone number, and, if available, email
            address).
          </li>
          <li>
            A statement under penalty of perjury by you that you have a good
            faith belief that the material identified above was removed or
            disabled as a result of a mistake or misidentification of the
            material to be removed or disabled.
          </li>
          <li>
            A statement that you will consent to the jurisdiction of the Federal
            District Court for the judicial district in which your address is
            located (or if you reside outside the United States for any judicial
            district in which the Website may be found) and that you will accept
            service from the person (or an agent of that person) who provided
            the Website with the complaint at issue.
          </li>
        </ul>
        <p>
          The DMCA allows us to restore the removed content if the party filing
          the original DMCA Notice does not file a court action against you
          within ten business days of receiving the copy of your Counter Notice.
        </p>
        <p>
          Please be aware that if you knowingly materially misrepresent that
          material or activity on the Website was removed or disabled by mistake
          or misidentification, you may be held liable for damages (including
          costs and attorneys' fees) under Section 512(f) of the DMCA.
        </p>

        <p className="mt-4">
          <strong>Repeat Infringers</strong>
        </p>
        <p>
          It is our policy in appropriate circumstances to disable and/or
          terminate the accounts of users who are repeat infringers.
        </p>
      </div>

      {/* footer */}
      <Footer />
    </>
  );
}
