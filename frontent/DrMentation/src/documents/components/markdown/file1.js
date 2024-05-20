let content = `### VRN fw-setup: Failed to push configuration

#### Synopsis

\`\`\`bash

GLIMS Archers client
Apr 8, 2024, 10:28:39 AM

Failed to push configuration to: serofw01-serofw02
To retry: Set Ticket Data '__rejected_pushed_devices' to null after troubleshooting why the configuration was rejected.


GLIMS Archers client
Apr 8, 2024, 10:28:35 AM

Failed to configure serofw01-serofw02
Error:
Unable to perform commit on serofw01-serofw02-vip.mgmt.ericsson.se (192.168.220.42).
Reason:
CommitError(edit_path: None, bad_element: None, message: warning: mgd: statement already exists
warning: mgd: statement exists but matches patch
warning: mgd: statement already exists
warning: mgd: statement already exists
warning: mgd: statement already exists)

\`\`\`

#### Workaround/solution

1. Delete __rejected_pushed_devices from ticket data
2. Re-run the ticket


#### Example ticket(s)

* https://atropos-prod.netauto.gic.ericsson.se/tickets/163942
* https://atropos-prod.netauto.gic.ericsson.se/tickets/165138
* https://atropos-prod.netauto.gic.ericsson.se/tickets/165104


#### Suggested solution

* Implement retry if and error of this character is generated
`

export default content;
