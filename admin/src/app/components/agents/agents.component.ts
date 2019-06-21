import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AgentService } from 'src/app/services/agent/agent.service';
import { AddAgentDialogComponent } from '../add-agent-dialog/add-agent-dialog.component';
import { SnackBar } from 'src/app/utils';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css']
})
export class AgentsComponent implements OnInit {

  agents = [];

  constructor(private dialog: MatDialog,
    private agentService: AgentService,
    private snackBar: SnackBar) { }

  ngOnInit() {
    this.agentService.getAgents().subscribe(
      (data: any) => {
        this.agents = data;
      }
    )
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddAgentDialogComponent,
      {
        data: undefined,
        disableClose: true,
        autoFocus: true,
        width: '40%'
      });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.agents.push(result);
          this.snackBar.showSnackBar('Agent successfuly created');
        }
      },
      () => {
        this.snackBar.showSnackBar('An error occurred. Try again');
      }
    );
  }

}
