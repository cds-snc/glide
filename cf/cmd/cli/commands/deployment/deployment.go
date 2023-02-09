package deployment

import (
	"github.com/common-fate/clio"
	"github.com/common-fate/common-fate/pkg/service/targetdeploymentsvc"
	"github.com/common-fate/common-fate/pkg/types"
	"github.com/urfave/cli/v2"
)

var Command = cli.Command{
	Name:        "deployment",
	Description: "manage a deployment",
	Usage:       "manage a deployment",
	Subcommands: []*cli.Command{
		&RegisterCommand,
		&ValidateCommand,
	},
}

/*


```bash
# register the deployment with Common Fate
> cfcli deployment register --runtime=aws-lambda --id=okta-1 --aws-region=us-east-1 --aws-account=123456789012
[✔] registered deployment 'okta-1' with Common Fate
```

to exec this same command with go run, you can do:
go run cf/cmd/cli/main.go deployment register --runtime=aws-lambda --id=okta-1 --aws-region=us-east-1 --aws-account=123456789012

*/

var RegisterCommand = cli.Command{
	Name:        "register",
	Description: "register a deployment",
	Usage:       "register a deployment",
	Flags: []cli.Flag{
		&cli.StringFlag{Name: "id", Required: true},
		&cli.StringFlag{Name: "runtime", Required: true},
		&cli.StringFlag{Name: "aws-region", Required: true},
		&cli.StringFlag{Name: "aws-account", Required: true},
	},
	Action: func(c *cli.Context) error {

		ctx := c.Context

		reqBody := types.CreateTargetGroupDeploymentJSONRequestBody{}

		runtime := c.String("runtime")
		id := c.String("id")
		awsRegion := c.String("aws-region")
		awsAccount := c.String("aws-account")

		if runtime != "" {
			reqBody.Runtime = runtime
		}
		if id != "" {
			reqBody.Id = id
		}
		if awsRegion != "" {
			reqBody.AwsRegion = awsRegion
		}
		if awsAccount != "" {
			if targetdeploymentsvc.IsValidAwsAccountNumber(awsAccount) {
				reqBody.AwsAccount = awsAccount
			} else {
				clio.Errorf("[✖] invalid aws account id")
				return nil
			}
		}

		// initialise some types.ClientOption to pass to the client
		opts := []types.ClientOption{}

		cfApi, err := types.NewClientWithResponses("http://0.0.0.0:8080", opts...)
		if err != nil {
			return err
		}

		client, err := cfApi.CreateTargetGroupDeploymentWithResponse(ctx, reqBody)
		if err != nil {
			return err
		}

		switch client.StatusCode() {
		case 201:
			clio.Successf("[✔] registered deployment '%s' with Common Fate", c.String("id"))
			return nil
		case 400:
			clio.Errorf("[✖] bad request")
			return nil
		case 401:
			clio.Errorf("[✖] unauthorized")
			return nil
		default:
			clio.Errorf("[✖] unknown error")
			return nil
		}

	},
}

var ValidateCommand = cli.Command{
	Name:        "validate",
	Description: "validate a deployment",
	Usage:       "validate a deployment",
	Flags: []cli.Flag{
		&cli.StringFlag{Name: "runtime", Required: true},
		&cli.StringFlag{Name: "id", Required: true},
		&cli.StringFlag{Name: "aws-region", Required: true},
	},
	Action: func(c *cli.Context) error {

		return nil
	},
}
